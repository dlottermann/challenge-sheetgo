import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { initialState, reducer } from "./reducers";
import { StateProvider } from "./store";
import { Router } from "@reach/router";
import { Navbar } from "../src/components/shared/Navbar";
import BookForm from "./components/BookForm";
import Category from "./components/Category";
import { Detail } from "./components/shared/Detail";

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <Navbar />
    <Router>
      <App path="/" />
      <Category path="/category/:id" />
      <BookForm path="/newBook" />
      <BookForm path="/edtBook/:id" />
      <Detail path="/detail/:id" />
    </Router>
  </StateProvider>,
  document.getElementById("root")
);
