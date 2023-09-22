import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CountContextProvider } from "./contexts/CountContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CountContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CountContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
