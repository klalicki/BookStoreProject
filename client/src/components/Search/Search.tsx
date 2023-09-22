import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import useSWR from "swr";
import BookList from "../BookList/BookList";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let defaultSearch = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(defaultSearch);
  const [books, setBooks] = useState([]);

  const { token } = useContext(AuthContext);

  const fetchData = async (url: string) => {
    return axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
  };
  const { data, error, isLoading } = useSWR(
    `/api/book/search/${searchQuery}`,
    fetchData,
    { revalidateOnFocus: false, revalidateIfStale: false }
  );
  // console.log(data?.data);
  useEffect(() => {
    setBooks(data?.data.books);
  }, [data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSearchParams({ q: e.target.value });
  };
  return (
    <div className="search">
      <h2>Search</h2>
      <input type="text" value={searchQuery} onChange={handleSearch} />
      {isLoading && <div className="alert alert-branded">Loading...</div>}
      {error && <div className="alert alert-loud">Error: {error.message}</div>}
      {!isLoading && books && books.length && (
        <BookList title={"Search Results"} list={books} showDelete={false} />
      )}
    </div>
  );
};

export default Search;
