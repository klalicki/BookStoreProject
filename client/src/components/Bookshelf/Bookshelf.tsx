import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";
import BookThumbnail from "../BookThumbnail/BookThumbnail";
import axios, { AxiosError } from "axios";
import BookControls from "../BookControls/BookControls";
import BookList from "../BookList/BookList";
const Bookshelf = () => {
  const { token, logout } = useContext(AuthContext);
  const [bookshelves, setBookshelves] = useState({
    currentlyReading: [],
    wantToRead: [],
    read: [],
  });
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/bookshelf", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookshelves(data.books);
        setIsReady(true);
        setIsLoading(false);
      } catch (error: any | AxiosError) {
        if (error.response.status == 401) {
        //  TODO: notify the user that the token has expired
          logout();
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bookshelf-container">
      <h2>Bookshelf</h2>
      {isLoading ? <h3>Loading...</h3> : null}
      {isReady ? (
        <>
          <BookList
            title={"Want To Read"}
            list={bookshelves.wantToRead}
            setBookshelves={setBookshelves}
            showDelete={true}
          />
          <BookList
            title={"Currently Reading"}
            list={bookshelves.currentlyReading}
            setBookshelves={setBookshelves}
            showDelete={true}
          />

          <BookList
            title={"Read"}
            list={bookshelves.read}
            setBookshelves={setBookshelves}
            showDelete={true}
          />
        </>
      ) : null}
    </div>
  );
};

export default Bookshelf;
