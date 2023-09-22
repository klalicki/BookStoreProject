import { Link } from "react-router-dom";
const BookThumbnail = ({ book, children }: { book: any; children?: any }) => {
  let imageUrl = "";
  if (book.imageLinks) {
    imageUrl = book.imageLinks.thumbnail;
  }
  return (
    <article className="book-thumbnail">
      <Link to={`/book/${book.id}`}>
        {" "}
        <img src={imageUrl} alt={`book cover of ${book.title}`} />
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
    </article>
  );
};
export default BookThumbnail;
