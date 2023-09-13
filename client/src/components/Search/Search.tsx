import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("q"));
  let defaultSearch = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(defaultSearch);

  useEffect(() => {
    const fetchSearch = async () => {
      const { data } = await axios.get(`api/book/search/${searchQuery}`);
      console.log(data);
    };
    fetchSearch();
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSearchParams({ q: e.target.value });
  };
  return (
    <div>
      <h2>Search</h2>
      <input type="text" value={searchQuery} onChange={handleSearch} />
    </div>
  );
};
export default Search;
