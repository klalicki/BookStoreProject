import axios from "axios";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState } from "react";
const Book = () => {
  const { token } = useContext(AuthContext);
  const [book, setBook] = useState({});
  const params = useParams();
  const fetchData = async (url: string) => {
    return axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
  };
  const { data, error, isLoading } = useSWR(
    `/api/book/${params.bookID}`,
    fetchData
  );
  const bookData = data?.data.book;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  console.log(bookData);
  return (
    <>
      <img src={data?.data.book.imageLinks.smallThumbnail} alt="" />
      <h1>{data?.data.book.title || "No title listed"}</h1>
      <h2>{data?.data.book.authors.join(", ") || "No authors listed"}</h2>
      <h6>controls to move book to other collections will go here</h6>
    </>
  );
};

export default Book;
