import BookControls from "../BookControls/BookControls";
import BookThumbnail from "../BookThumbnail/BookThumbnail";

const BookList = ({
  list,
  setBookshelves,
  showDelete,
}: {
  list: Array<any>;
  setBookshelves?: Function;
  showDelete?: boolean;
}) => {
  return (
    <div>
      <ul className="book-list">
        {list.map((book: any) => {
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
        })}
      </ul>
    </div>
  );
};
export default BookList;
