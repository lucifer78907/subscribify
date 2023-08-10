import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./sass/_base.scss";
import "./sass/_theme.scss";
import { UIContextProvider } from "./context/ui-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UIContextProvider>
    <App />
  </UIContextProvider>
);
