import { Link } from "react-router-dom";
const BookThumbnail = ({ book, children }: { book: any; children?: any }) => {
  let imageUrl = "";
  if (book.imageLinks) {
    imageUrl = book.imageLinks.thumbnail;
  }
  return (
    <article>
      <Link to={`/book/${book.id}`}>Link</Link>
      {book.title && <h2>{book.title}</h2>}
      {book.subtitle && <h3>{book.subtitle}</h3>}
      {book.authors && (
        <p>
          {book.authors.length > 1 ? "Authors: " : "Author: "}
          {book.authors.join(", ")}
        </p>
      )}

      <img src={imageUrl} alt={`book cover of ${book.title}`} />

      {children}
    </article>
  );
};
export default BookThumbnail;
