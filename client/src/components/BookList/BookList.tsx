import { Link } from "react-router-dom";
import BookControls from "../BookControls/BookControls";
import BookThumbnail from "../BookThumbnail/BookThumbnail";
type BookObj = {
  id: string;
  shelf: string;
};
const BookList = ({
  list,
  setBookshelves,
  showDelete,
  title,
}: {
  list: Array<BookObj>;
  setBookshelves?: Function;
  showDelete?: boolean;
  title?: string;
}) => {
  return (
    <div className="book-list-container">
      <h3>{title}</h3>
      <ul className="book-list">
        {list.length > 0 ? (
          list.map((book: BookObj) => {
            return (
              <li key={book.id}>
                <BookThumbnail book={book}>
                  <BookControls
                    bookID={book.id}
                    shelfID={book.shelf}
                    setBookshelves={setBookshelves}
                    showDelete={showDelete}
                  />
                </BookThumbnail>
              </li>
            );
          })
        ) : (
          <div>
            There's nothing here! <Link to="/search/">Search</Link> for books to
            add.
          </div>
        )}
      </ul>
    </div>
  );
};
export default BookList;
