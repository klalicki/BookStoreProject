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
      {list.map((book: any) => {
        return (
          <BookThumbnail key={book.id} book={book}>
            <BookControls
              bookID={book.id}
              shelfID={book.shelf}
              setBookshelves={setBookshelves}
              showDelete={showDelete}
            />
          </BookThumbnail>
        );
      })}
    </div>
  );
};
export default BookList;
