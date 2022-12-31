import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";


const loader = document.querySelector("#preloader");

// if you want to show the loader when React loads data again
const showLoader = () => loader.classList.remove("loader--hide");

const hideLoader = () => loader.classList.add("loader--hide");

setTimeout(
  () =>
    // the show/hide functions are passed as props
    ReactDOM.render(
      <App hideLoader={hideLoader} showLoader={showLoader} />,
      document.getElementById("root")
    ),
  1000
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
