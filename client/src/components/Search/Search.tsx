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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("fetching search from server");
    const fetchData = async (query: string) => {
      if (query === "") {
        return;
      }
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/api/book/search/${query}`);
        if (data.status != "complete") {
          console.log(data);
        } else {
          console.log("got books from API");
          setBooks(data.books);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (searchQuery !== "") {
      fetchData(searchQuery);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSearchParams({ q: e.target.value });
  };
  return (
    <div>
      <h2>Search</h2>
      <input type="text" value={searchQuery} onChange={handleSearch} />
      {!isLoading && (
        <BookList title={"Search Results"} list={books} showDelete={false} />
      )}
    </div>
  );
};

export default Search;
