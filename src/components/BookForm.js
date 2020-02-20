import React, { useState, useMemo } from "react";
import { Form, Input, Select } from "@rocketseat/unform";
import { Link, navigate } from "@reach/router";
import * as Yup from "yup";
import { useStateValue } from "../store";
import { persistLocalStorage } from "../services/api";
import uiid from "uuid";

import "../assets/BookForm.css";

const BookForm = ({ id }) => {
  const [state, dispatch] = useStateValue();
  const [message, setMessage] = useState("");
  const [bookId, setBookId] = useState("0");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [cat, setCat] = useState("");

  useMemo(() => {
    let response = Object.values(state.books).filter(c => c.id === id)[0];
    if (response) {
      setBookId(id);
      setTitle(response.title);
      setAuthor(response.author);
      setDescription(response.description);
      //todo refactor this
      let category = state.categories.find(op => op.id === response.category);
      setCat(category.id);
    }
    persistLocalStorage("books", JSON.stringify(state.books));
  }, [id, state]);

  const schema = Yup.object().shape({
    id: Yup.string(),
    title: Yup.string().required("Title is required!"),
    author: Yup.string().required("Author is required!"),
    description: Yup.string(),
    category: Yup.string().required("Required! Plese select a category.")
  });

  const handleSubmit = data => {
    let newBook = state.books;
    let bookId = data.id;
    data.id = data.id !== "0" ? data.id : uiid();
    data.timestamp = Date.now();
    data.deleted = false;

    if (bookId !== "0") {
      let upBook = Object.values(state.books).map(book => {
        if (book.id !== data.id) {
          return book;
        }
        return {
          ...book,
          title: data.title,
          author: data.author,
          description: data.description,
          category: data.category
        };
      });

      dispatch({
        type: "UPDATEBOOK",
        payload: upBook
      });
    } else {
      newBook.push(data);
      dispatch({
        type: "SAVE",
        payload: newBook
      });
    }

    setMessage("Success!");
    setBookId("0");
    setTitle("");
    setDescription("");
    setAuthor("");
    setCat("");

    setTimeout(() => navigate("/"), 1200);
  };

  return (
    <React.Fragment>
      <div className="formGroup">
        {message && <h3>{message}</h3>}
        <Form schema={schema} onSubmit={handleSubmit}>
          <Input name="id" value={bookId} type="hidden" />
          <label>Title</label>
          <Input
            name="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <label>Author</label>
          <Input
            name="author"
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
          <label>Description</label>
          <Input
            multiline
            name="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <label>Category</label>
          <Select
            value={cat}
            name="category"
            options={state.categories}
            onChange={e => setCat(e.target.value)}
          />
          <button className="btn" type="submit">
            Save
          </button>
          <Link to="/">Back</Link>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default BookForm;
