import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App/App.jsx";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <App serverHost="server-ip" />
  , document.getElementById("root"));
registerServiceWorker();
