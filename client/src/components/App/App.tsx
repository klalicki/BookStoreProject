import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../Login/LoginPage";
function App() {
  return (
    <div className="App">
      <header></header>
      <main>
        <Routes>
          <Route path="/bookshelf" element={<h2>Bookshelf</h2>} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/book/:bookID" element={<h2>book</h2>} />
          <Route path="/search" element={<h2>Search</h2>} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
