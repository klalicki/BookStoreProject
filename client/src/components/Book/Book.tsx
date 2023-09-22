import axios from "axios";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import BookControls from "../BookControls/BookControls";
const Book = () => {
  const { token } = useContext(AuthContext);

  const params = useParams();
  const fetchData = async (url: string) => {
    return axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
  };
  const { data, error, isLoading } = useSWR(
    `/api/book/${params.bookID}`,
    fetchData
  );
  const book = data?.data.book;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <article className="book-info">
      {book?.imageLinks?.thumbnail ? (
        <img
          src={book?.imageLinks?.thumbnail}
          alt={`book cover of ${book.title}`}
        />
      ) : (
        <div className="cover-placeholder">No Cover Image Available</div>
      )}

      <h1>{book.title || "No title listed"}</h1>
      <h2>{book.authors.join(", ") || "No authors listed"}</h2>
      <p>{book.description || "No description listed"}</p>
      <h4>Categories</h4>
      <ul className="book-categories-list">
        {(book.categories || ["No categories listed"]).map((item: string) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
      <h4>Publication Info</h4>
      <ul className="book-pub-info">
        <li>
          <span className="bold">Publisher:</span>{" "}
          {book.publisher || "None listed"}
        </li>
        <li>
          <span className="bold">Publication Date:</span>{" "}
          {book.publishedDate || "None listed"}
        </li>
        <li>
          <span className="bold">Page Count:</span>{" "}
          {book.pageCount || "None listed"}
        </li>
      </ul>

      <BookControls bookID={book.id} />
    </article>
  );
};

export default Book;
