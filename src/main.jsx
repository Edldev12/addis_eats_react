import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App.jsx";
import { AdminAuthProvider } from "./admin/AdminAuthContext.jsx";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AdminAuthProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </AdminAuthProvider>
    </BrowserRouter>
  </StrictMode>
);