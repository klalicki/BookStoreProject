import BookControls from "../BookControls/BookControls";
import BookThumbnail from "../BookThumbnail/BookThumbnail";

const BookList = ({
  list,
  setBookshelves,
}: {
  list: Array<any>;
  setBookshelves?: Function;
}) => {
  return (
    <div>
      {list.map((book: any) => {
        return (
          <BookThumbnail key={book.id} book={book}>
            <BookControls
              bookID={book.id}
              shelfID={book.shelf}
              setBookshelves={setBookshelves}
            />
          </BookThumbnail>
        );
      })}
    </div>
  );
};
export default BookList;
