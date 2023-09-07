import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { GlobalStyles, GlobalFonts } from "@assets/styles";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyles />
    <GlobalFonts />
    <App />
  </React.StrictMode>
);
