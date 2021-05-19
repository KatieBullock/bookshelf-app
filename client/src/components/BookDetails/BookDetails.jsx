import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AccessTokenContext } from "../../context/AccessTokenContext";
import { BookshelfContext } from "../../context/BookshelfContext";
import axios from "axios";

const BookDetails = () => {
  const { getToken, logout } = useContext(AccessTokenContext);
  const { bookshelf, changeShelf, removeBook } = useContext(BookshelfContext);

  const { bookId } = useParams();

  const [book, setBook] = useState("");
  const [hasError, setHasError] = useState("");

  const viewDetails = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `/api/book/${bookId}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      console.log(response.data.book);
      setBook(response.data.book);
    } catch (error) {
      setHasError(true);
    }
  };

  useEffect(() => {
    viewDetails();
    // eslint-disable-next-line
  }, [bookshelf]);

  return (
    <div>
      <div>
        <h1>You are logged in!</h1>
        <button onClick={logout}>Logout</button>
      </div>
      <h2>{book.title}</h2>
      <img
        src={
          book.imageLinks
            ? book.imageLinks.thumbnail
            : "https://via.placeholder.com/150x200/000000/FFFFFF/?text=No+image"
        }
        alt={book.title}
      />
      <div>
        {book.authors ? (
          book.authors.length > 1 ? (
            <div>
              Authors:
              <div>
                {book.authors.map((author, index) => {
                  return <div key={`${author}-${index}`}>{author}</div>;
                })}
              </div>
            </div>
          ) : (
            <div>
              Author: <div>{book.authors}</div>
            </div>
          )
        ) : (
          <div>Author Unavailable</div>
        )}
      </div>
      <div>
        {book.description ? book.description : "No description available"}
      </div>
      <div>
        {book.publisher
          ? `Publisher: ${book.publisher}`
          : "Publisher Unavailable"}
      </div>
      <div>
        {book.publishedDate
          ? `Published Date: ${book.publishedDate}`
          : "Published Date Unavailable"}
      </div>
      <div>
        <select
          id="dropdown"
          type="text"
          value={book.shelf}
          onChange={(e) => {
            e.target.value === "none"
              ? removeBook(book.id)
              : changeShelf(book.id, e.target.value);
          }}
        >
          <option value="none">None</option>
          <option value="wantToRead">Want To Read</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="read">Read</option>
        </select>
      </div>
      {hasError && <div>We're sorry, but an unexpected error occurred.</div>}
    </div>
  );
};

export default BookDetails;
