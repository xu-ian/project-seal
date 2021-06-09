import React from "react";
import ReactDOM from "react-dom";
import Registration from "./components/registration"
import Login from "./components/Login"

import App from "./App";
import { BrowserRouter } from "react-router-dom"; //for the web to be responsive

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);