import React from "react";
import { Link } from "@reach/router";
import { useStateValue } from "../../store";

export const Navbar = () => {
  const [state] = useStateValue();
  return (
    <nav>
      <Link to="/">Home</Link>
      {state.categories.map(cat => {
        return (
          <Link key={cat.id} to={`/category/${cat.id}`}>
            {cat.title}
          </Link>
        );
      })}
      <Link to="/newBook">New Book</Link>
    </nav>
  );
};
