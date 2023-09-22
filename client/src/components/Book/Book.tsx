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
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <article className="book-info">
      <img src={data?.data.book.imageLinks.thumbnail} alt="" />
      <h1>{data?.data.book.title || "No title listed"}</h1>
      <h2>{data?.data.book.authors.join(", ") || "No authors listed"}</h2>
      <p>{data?.data.book.description || "No description listed"}</p>
      <h4>Categories</h4>
      <ul className="book-categories-list">
        {(data?.data.book.categories || ["No categories listed"]).map(
          (item: string) => {
            return <li key={item}>{item}</li>;
          }
        )}
      </ul>
      <h4>Publication Info</h4>
      <ul className="book-pub-info">
        <li>
          <span className="bold">Publisher:</span>{" "}
          {data?.data.book.publisher || "None listed"}
        </li>
        <li>
          <span className="bold">Publication Date:</span>{" "}
          {data?.data.book.publishedDate || "None listed"}
        </li>
        <li>
          <span className="bold">Page Count:</span>{" "}
          {data?.data.book.pageCount || "None listed"}
        </li>
      </ul>

      <BookControls bookID={data?.data.book.id} />
    </article>
  );
};

export default Book;
