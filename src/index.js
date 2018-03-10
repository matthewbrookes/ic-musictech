import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App/App.jsx";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <App serverHost="54.154.219.37" />
  , document.getElementById("root"));
registerServiceWorker();
