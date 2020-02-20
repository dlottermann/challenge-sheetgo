import React from "react";
import { Book } from "./Book";

export const Books = ({ titleShelf, books }) => {
  return (
    <React.Fragment>
      <h4>{titleShelf}</h4>
      <div className="book-container">
        {books.length > 0 ? (
          books.map(b => <Book key={b.id} {...b} />)
        ) : (
          <span className="empty">Nothing books on this category</span>
        )}
      </div>
    </React.Fragment>
  );
};
