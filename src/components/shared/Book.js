import React, { Fragment } from "react";
import { Link } from "@reach/router";

export const Book = props => {
  const { title, author, description, id } = props;

  return (
    <Fragment>
      <div className="book-card">
        <div className="bookInfo">
          <div>
            <span className="book-title">
              <slot name="title">{title}</slot>
            </span>
            <p className="author">
              <slot name="author">{author}</slot>
            </p>
          </div>
          <section className="book-description">
            <slot name="description">
              {description}
              <div className="fading" />
            </slot>
          </section>
          <Link to={`/detail/${id}`} className="book-more">
            more..
          </Link>
        </div>
      </div>
    </Fragment>
  );
};
