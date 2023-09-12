import axios from "axios";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
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
  console.log(data);
  return (
    <div>
      <h3>Individual Book component</h3>
      <h2>Book ID: {params.bookID}</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.toString()}</p>}
    </div>
  );
};
export default Book;
