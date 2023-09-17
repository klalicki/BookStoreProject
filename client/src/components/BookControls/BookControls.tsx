import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const BookControls = ({
  bookID,
  shelfID,
  setBookshelves,
  showDelete,
}: {
  bookID: string;
  shelfID: string;
  setBookshelves?: Function;
  showDelete?: boolean;
}) => {
  const { token } = useContext(AuthContext);
  const [shelf, setShelf] = useState(shelfID);
  const handleShelfSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShelf(e.target.value);
    changeShelf(e.target.value);
  };
  const changeShelf = async (newShelf: string) => {
    try {
      console.log(`/api/bookshelf/${bookID}/${newShelf}`);
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
    } catch (error) {
      console.log("error:" + error);
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
    } catch (error) {}
  };
  return (
    <div>
      <select name="" id="" value={shelf} onChange={handleShelfSelect}>
        <option value="none">None</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="read">Read</option>
        <option value="wantToRead">Want To Read</option>
      </select>
      {showDelete && <button onClick={() => deleteBook()}>Delete</button>}
    </div>
  );
};

export default BookControls;
