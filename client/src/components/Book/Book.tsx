import { useParams } from "react-router-dom";
const Book = () => {
  const params = useParams();
  console.log(params);
  return (
    <div>
      <h3>Individual Book component</h3>
      <h2>Book ID: {params.bookID}</h2>
    </div>
  );
};
export default Book;
