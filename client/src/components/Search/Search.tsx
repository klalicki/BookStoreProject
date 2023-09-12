import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("q"));
  let defaultSearch = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(defaultSearch);

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
