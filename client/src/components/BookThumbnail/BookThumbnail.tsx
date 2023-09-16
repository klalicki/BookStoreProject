const BookThumbnail = ({ book }: { book: any }) => {
  return (
    <div>
      <h2>{book.title}</h2>
      <p>{JSON.stringify(book)}</p>
    </div>
  );
};
export default BookThumbnail;
