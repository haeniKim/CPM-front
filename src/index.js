import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = createRoot(document.getElementById("root")); // id 값이 root인 태그로 렌더링 되는 것

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();
