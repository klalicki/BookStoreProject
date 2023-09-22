import React from "react";
import "./App.scss";
import { Route, Routes, NavLink } from "react-router-dom";
import LoginPage from "../Login/LoginPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Book from "../Book/Book";
import ErrorPage from "../ErrorPage/ErrorPage";
import LogoutButton from "../LogoutButton/LogoutButton";
import Search from "../Search/Search";
import Bookshelf from "../Bookshelf/Bookshelf";
import { CountContext } from "../../contexts/CountContext";
import { useContext } from "react";

function App() {
  const { count } = useContext(CountContext);
  return (
    <div className="appContainer">
      <header className="topBar">
        <nav>
          <h2>Bookstore App</h2>

          <ProtectedRoute>
            <NavLink to="/bookshelf/">
              Bookshelf <span className={"bookshelf-counter"}>{count}</span>
            </NavLink>
            <NavLink to="/search/">Search</NavLink>
            <LogoutButton />
          </ProtectedRoute>
        </nav>
      </header>
      <main>
        <Routes>
          <Route
            path="/bookshelf"
            element={
              <ProtectedRoute>
                <Bookshelf />
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
