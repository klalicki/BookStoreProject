import BookThumbnail from "../BookThumbnail/BookThumbnail";
const SearchResults = (props: any) => {
  return (
    <div>
      {props.books.map((book: any) => {
        return <BookThumbnail book={book} />;
      })}
    </div>
  );
};

export default SearchResults;
