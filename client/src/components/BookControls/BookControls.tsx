import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
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
  const [shelf, setShelf] = useState(shelfID);
  const handleShelfSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShelf(e.target.value);
    changeShelf(e.target.value);
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
      if (setBookshelves) {
        setBookshelves(data.books);
      }
    } catch (error: any | AxiosError) {
      if (error.response.status == 401) {
        logout();
      }
    }
  };
  const deleteBook = async () => {
    try {
      const { data } = await axios.delete(`/api/bookshelf/${bookID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (setBookshelves) {
        setBookshelves(data.books);
      }
    } catch (error: any | AxiosError) {
      if (error.response.status == 401) {
        logout();
      }
    }
  };
  return (
    <div>
      <label htmlFor="shelf-select">Move to shelf: </label>
      <select
        name=""
        id="shelf-select"
        value={shelf}
        onChange={handleShelfSelect}
      >
        <option value="none">None</option>
        <option value="wantToRead">Want To Read</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="read">Read</option>
      </select>
      {showDelete && <button onClick={() => deleteBook()}>Remove</button>}
    </div>
  );
};

export default BookControls;
