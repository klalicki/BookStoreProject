import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import BookList from "../BookList/BookList";
import { CountContext } from "../../contexts/CountContext";
import useSWR from "swr";
type BookObj = {
  id: string;
};
type BookListsObj = {
  read: Array<BookObj>;
  wantToRead: Array<BookObj>;
  currentlyReading: Array<BookObj>;
};
const sumShelves = (bookObj: BookListsObj) => {
  return (
    bookObj.read.length +
    bookObj.wantToRead.length +
    bookObj.currentlyReading.length
  );
};
const Bookshelf = () => {
  const { token, logout } = useContext(AuthContext);
  const { setCount } = useContext(CountContext);
  const [bookshelves, setBookshelves] = useState({
    currentlyReading: [],
    wantToRead: [],
    read: [],
  });

  const fetchData = async (url: string) => {
    return axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  const { data, error, isLoading } = useSWR(`/api/bookshelf`, fetchData);
  useEffect(() => {
    if (error && error.response.status === 401) {
      logout();
    }
    if (data) {
      setCount(sumShelves(data.data.books));
      setBookshelves(data?.data.books);
    }
  }, [data, error, logout, setCount]);

  return (
    <div className="bookshelf-container">
      <h2>Bookshelf</h2>
      {isLoading ? <div className="alert alert-branded">Loading...</div> : null}
      {error && <div className="alert alert-loud">Error: {error.message}</div>}
      {!isLoading && !error ? (
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
