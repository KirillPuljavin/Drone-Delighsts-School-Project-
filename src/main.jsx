// File: src/main.jsx

import "./i18n.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { bootstrapLocalData } from "./utils/bootstrapLocalData";

bootstrapLocalData();

createRoot(document.getElementById("root")).render(<App />);
