import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//components
import App from "./App.tsx";

//style
import "./style/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
