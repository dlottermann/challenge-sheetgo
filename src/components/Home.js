import React from "react";
import { useStateValue } from "../store";
import { Books } from "./shared/Books";

const Home = props => {
  const [state] = useStateValue();
  const { books } = state;

  return (
    <div className="container">
      <Books
        books={books.filter(b => b.category === "reading")}
        titleShelf="Currently Reading"
      />
      <Books
        books={books.filter(b => b.category === "wantToRead")}
        titleShelf="Want To Read"
      />
      <Books
        books={books.filter(b => b.category === "read")}
        titleShelf="Read"
      />
    </div>
  );
};

export default Home;
