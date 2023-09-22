import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import useSWR from "swr";
import BookList from "../BookList/BookList";

const Search = () => {
  const { token } = useContext(AuthContext);

  const [searchParams, setSearchParams] = useSearchParams();

  let defaultSearch = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(defaultSearch);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async (query: string) => {
      if (query === "") {
        return;
      }
      try {
        const { data } = await axios.get(`/api/book/search/${query}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (data.status !== "complete") {
        } else {
          setBooks(data.books);
          setIsLoading(false);
        }
      } catch (error) {
        setIsError(true);
      }
    };
    if (searchQuery !== "") {
      setIsLoading(true);
      fetchData(searchQuery);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    setSearchQuery(e.target.value);
    setSearchParams({ q: e.target.value });
  };
  return (
    <div className="search">
      <h2>Search</h2>
      <input type="text" value={searchQuery} onChange={handleSearch} />
      {isLoading && <div className="alert alert-branded">Loading...</div>}
      {!isLoading && (
        <BookList title={"Search Results"} list={books} showDelete={false} />
      )}
    </div>
  );
};

export default Search;
