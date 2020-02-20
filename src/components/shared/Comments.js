import React, { useState } from "react";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";
import { useStateValue } from "../../store";
import { persistLocalStorage } from "../../services/api";
import uiid from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import "../../assets/BookForm.css";

const edt = <FontAwesomeIcon icon={faPencilAlt} />;
const trash = <FontAwesomeIcon icon={faTrashAlt} />;

export const Comments = ({ id }) => {
  const [state, dispatch] = useStateValue();
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);

  const [commentId, setCommentId] = useState("0");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  React.useMemo(() => {
    let response = Object.values(state.comments).filter(c => c.parentId === id);
    if (response) {
      setComments(response);
    }
    persistLocalStorage("comments", JSON.stringify(state.comments));
  }, [id, state]);

  const schema = Yup.object().shape({
    id: Yup.string(),
    author: Yup.string().required("Author is required!"),
    body: Yup.string().required("Author is required!")
  });

  const handleSubmit = data => {
    let cId = data.id;
    let newComment = state.comments;
    data.parentId = id;
    data.id = data.id !== "0" ? data.id : uiid();
    data.timestamp = Date.now();
    data.deleted = false;

    if (cId !== "0") {
      let upComment = Object.values(state.comments).map(comment => {
        if (comment.id !== data.id) {
          return comment;
        }
        return {
          ...comment,
          author: data.author,
          body: data.body
        };
      });
      dispatch({
        type: "UPDATECOMMENT",
        payload: upComment
      });
    } else {
      newComment.push(data);
      dispatch({
        type: "SAVECOMMENT",
        payload: newComment
      });
    }
    setMessage("Success!");
    setTimeout(() => setMessage(""), 1200);
    setCommentId(0);
    setAuthor("");
    setDescription("");
  };

  const handleEdt = id => {
    let response = Object.values(state.comments).filter(c => c.id === id)[0];
    if (response) {
      const { author, body } = response;
      setCommentId(id);
      setAuthor(author);
      setDescription(body);
    }
  };

  const removeComment = id => {
    let newState = Object.values(state.comments).filter(c => c.id !== id);
    dispatch({
      type: "DELETECOMMENT",
      payload: newState
    });
    persistLocalStorage("comments", JSON.stringify(newState));
  };

  const normalizeDate = date => {
    let d = new Date(date);
    return d.toLocaleString(); //to pt-br pass how argument
  };

  return (
    <div className="comments-body">
      <h4>Comments</h4>
      {comments && (
        <ul>
          {comments.map(c => {
            return (
              <li key={c.id}>
                <span className="comment-title">{c.author}</span>
                <p className="comment-body">{c.body}</p>
                <span className="small-date">
                  last change at {normalizeDate(c.timestamp)}
                </span>
                <button
                  className="book-act-detail"
                  onClick={() => removeComment(c.id)}
                >
                  {trash}
                </button>
                <button
                  className="book-act-detail"
                  onClick={() => handleEdt(c.id)}
                >
                  {edt}
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <div className="formGroup">
        {message && <h3>{message}</h3>}
        <Form schema={schema} onSubmit={handleSubmit}>
          <Input name="id" type="hidden" value={commentId} />
          <label>Author</label>
          <Input
            name="author"
            type="text"
            onChange={e => setAuthor(e.target.value)}
            value={author}
          />
          <label>Comment</label>
          <Input
            multiline
            name="body"
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
          <button className="btn" type="submit">
            Save
          </button>
        </Form>
      </div>
    </div>
  );
};
