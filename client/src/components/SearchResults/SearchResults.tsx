import BookControls from "../BookControls/BookControls";
import BookThumbnail from "../BookThumbnail/BookThumbnail";
const SearchResults = (props: any) => {
  console.log(props.books);
  return (
    <div>
      {props.books.map((book: any) => {
        return (
          <BookThumbnail book={book}>
            <BookControls bookID={book.id} shelfID={book.shelf} />
          </BookThumbnail>
        );
      })}
    </div>
  );
};

export default SearchResults;
