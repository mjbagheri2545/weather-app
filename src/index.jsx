import "./style/utilities.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style/index.css";
import "react-loading-skeleton/dist/skeleton.css";
import { BrowserRouter as Router } from "react-router-dom";
import Provider from "./components/provider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Provider>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
