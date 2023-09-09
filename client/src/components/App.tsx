import React from "react";
import logo from "../logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header></header>
      <main>
        <Routes>
          <Route path="/bookshelf" element={<h2>Bookshelf</h2>} />
          <Route path="/" element={<h2>Login</h2>} />
          <Route path="/book/:bookID" element={<h2>book</h2>} />
          <Route path="/search" element={<h2>Search</h2>} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
