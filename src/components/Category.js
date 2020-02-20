import React, { useState, Fragment, useEffect } from "react";
import { Books } from "./shared/Books";
import { useStateValue } from "../store";

const Category = ({ id }) => {
  const [state] = useStateValue();
  const [title, setTitle] = useState("");
  const [books, setBooks] = useState("");

  useEffect(() => {
    let response = state.categories.filter(c => c.id === id);
    setTitle(response[0].title);

    let responseBooks = state.books.filter(b => b.category === id);
    setBooks(responseBooks);
  }, [id, state]);

  return (
    <Fragment>
      <Books books={books} titleShelf={title} />
    </Fragment>
  );
};

export default Category;
