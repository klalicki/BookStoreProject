import { Link } from "react-router-dom";
const BookThumbnail = ({ book }: { book: any }) => {
  return (
    <div>
      <Link to={`/book/${book.id}`}>Link</Link>
      <h2>{book.title}</h2>
      <p>{JSON.stringify(book)}</p>
    </div>
  );
};
export default BookThumbnail;
