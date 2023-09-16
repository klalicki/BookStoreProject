import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";
import BookThumbnail from "../BookThumbnail/BookThumbnail";
import axios from "axios";
import BookControls from "../BookControls/BookControls";
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
      <div>
        {bookshelves.currentlyReading.map((book: any) => {
          return (
            <BookThumbnail key={book.id} book={book}>
              <BookControls
                bookID={book.id}
                shelfID={book.shelf}
                setBookshelves={setBookshelves}
              />
            </BookThumbnail>
          );
        })}
      </div>
    </div>
  );
};

export default Bookshelf;
