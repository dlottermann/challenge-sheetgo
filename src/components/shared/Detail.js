import React, { Fragment, useState } from "react";
import { useStateValue } from "../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Comments } from "./Comments";
import { persistLocalStorage } from "../../services/api";
import { navigate } from "@reach/router";

const edt = <FontAwesomeIcon icon={faPencilAlt} />;
const trash = <FontAwesomeIcon icon={faTrashAlt} />;

export const Detail = ({ id }) => {
  const [state, dispatch] = useStateValue();
  const [book, setBook] = useState();

  React.useMemo(() => {
    let response = Object.values(state.books).filter(b => b.id === id)[0];
    if (response) {
      setBook(response);
    }
  }, [id, state]);

  const removeBook = () => {
    let newState = Object.values(state.books).filter(c => c.id !== id);
    dispatch({
      type: "DELETEBOOK",
      payload: newState
    });

    persistLocalStorage("books", JSON.stringify(newState));
    navigate("/");
  };

  const handleEdt = () => {
    navigate(`/edtBook/${id}`);
  };

  const normalizeCategory = cat => {
    let category = state.categories.find(op => op.id === cat);
    return category.title;
  };

  const normalizeDate = date => {
    let d = new Date(date);
    return d.toLocaleString(); //to pt-br pass how argument
  };

  return (
    <Fragment>
      {book && (
        <div className="book-card-detail">
          <div className="bookInfo-detail">
            <div>
              <button className="book-more-detail">
                {normalizeCategory(book.category)}
              </button>
              <span className="book-title-detail">
                <slot name="title">Title: {book.title}</slot>
              </span>
              <br />
              <span className="small-date">
                last update {normalizeDate(book.timestamp)}
              </span>
              <p className="author-detail">
                <slot name="author">Author: {book.author}</slot>
              </p>
            </div>
            <section className="book-description-detail">
              <p>Description</p>
              <slot name="description">{book.description}</slot>
            </section>
            <button onClick={removeBook} className="book-act-detail">
              {trash}
            </button>
            <button onClick={handleEdt} className="book-act-detail">
              {edt}
            </button>
          </div>
        </div>
      )}
      <Comments id={id} />
    </Fragment>
  );
};
