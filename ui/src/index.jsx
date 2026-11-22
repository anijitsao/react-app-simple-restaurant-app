// import the render
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

// the actual App component
import App from "./App";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
