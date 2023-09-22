import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { CountContext } from "../../contexts/CountContext";
type BookObj = {
  id: string;
};
type BookListsObj = {
  read: Array<BookObj>;
  wantToRead: Array<BookObj>;
  currentlyReading: Array<BookObj>;
};
const BookControls = ({
  bookID,
  shelfID,
  setBookshelves,
  showDelete,
}: {
  bookID: string;
  shelfID?: string;
  setBookshelves?: Function;
  showDelete?: boolean;
}) => {
  const { token, logout } = useContext(AuthContext);
  const { setCount } = useContext(CountContext);
  const [shelf, setShelf] = useState(shelfID);
  const handleShelfSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShelf(e.target.value);
    if (e.target.value) {
      changeShelf(e.target.value);
    } else {
      deleteBook();
    }
  };
  const sumShelves = (bookObj: BookListsObj) => {
    return (
      bookObj.read.length +
      bookObj.wantToRead.length +
      bookObj.currentlyReading.length
    );
  };
  const changeShelf = async (newShelf: string) => {
    try {
      const { data } = await axios.put(
        `/api/bookshelf/${bookID}/${newShelf}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (data.books) {
        setCount(sumShelves(data.books));
      }
      if (setBookshelves) {
        setBookshelves(data.books);
      }
    } catch (error: any | AxiosError) {
      if (error.response.status === 401) {
        logout();
      }
    }
  };
  const deleteBook = async () => {
    try {
      const { data } = await axios.delete(`/api/bookshelf/${bookID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.books) {
        setCount(sumShelves(data.books));
      }

      if (setBookshelves) {
        setBookshelves(data.books);
      }
    } catch (error: any | AxiosError) {
      if (error.response.status === 401) {
        logout();
      }
    }
  };
  return (
    <div className="book-controls">
      <div className="book-controls-move">
        <label htmlFor="shelf-select">
          {shelf ? "Move to shelf: " : "Add to shelf:"}
        </label>
        <select
          name=""
          id="shelf-select"
          value={shelf}
          onChange={handleShelfSelect}
        >
          {!showDelete && <option value="">None</option>}
          <option value="wantToRead">Want To Read</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="read">Read</option>
        </select>
      </div>

      {showDelete && <button onClick={() => deleteBook()}>Remove</button>}
    </div>
  );
};

export default BookControls;
