import { Link } from "react-router-dom";
const BookThumbnail = ({ book, children }: { book: any; children?: any }) => {
  return (
    <article className="book-thumbnail">
      <Link to={`/book/${book.id}`} className="thumbnail-image-link">
        {book?.imageLinks?.thumbnail ? (
          <img
            src={book?.imageLinks?.thumbnail}
            alt={`book cover of ${book.title}`}
          />
        ) : (
          <div className="cover-placeholder">No Cover Image Available</div>
        )}
      </Link>
      <section className="description">
        <div className="description-text">
          {book.title && <h2>{book.title}</h2>}
          {book.subtitle && <h3>{book.subtitle}</h3>}
          {book.authors && (
            <p>
              {book.authors.length > 1 ? "Authors: " : "Author: "}
              {book.authors.join(", ")}
            </p>
          )}
        </div>

        {children}
      </section>
      <Link className="thumbnail-link" to={`/book/${book.id}`}>
        {">"}
      </Link>
    </article>
  );
};
export default BookThumbnail;
