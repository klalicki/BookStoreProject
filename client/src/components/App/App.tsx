import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../Login/LoginPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Book from "../Book/Book";
import ErrorPage from "../ErrorPage/ErrorPage";
import LogoutButton from "../LogoutButton/LogoutButton";
import Search from "../Search/Search";
function App() {
  return (
    <div className="App">
      <header>
        <LogoutButton />
      </header>
      <main>
        <Routes>
          <Route
            path="/bookshelf"
            element={
              <ProtectedRoute>
                <h2>Bookshelf</h2>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/book/:bookID"
            element={
              <ProtectedRoute>
                <Book />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
