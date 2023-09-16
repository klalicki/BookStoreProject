import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";
import BookThumbnail from "../BookThumbnail/BookThumbnail";
import axios from "axios";
import BookControls from "../BookControls/BookControls";
import BookList from "../BookList/BookList";
const Bookshelf = () => {
  const { token } = useContext(AuthContext);
  const [bookshelves, setBookshelves] = useState({
    currentlyReading: [],
    wantToRead: [],
    read: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/bookshelf", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookshelves(data.books);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Bookshelf</h2>
      <h3>Want To Read</h3>
      <BookList list={bookshelves.wantToRead} setBookshelves={setBookshelves} />
      <h3>Currently Reading</h3>
      <BookList
        list={bookshelves.currentlyReading}
        setBookshelves={setBookshelves}
      />
      <h3>Read</h3>
      <BookList list={bookshelves.read} setBookshelves={setBookshelves} />
    </div>
  );
};

export default Bookshelf;
