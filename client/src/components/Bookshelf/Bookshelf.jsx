import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AccessTokenContext } from "../../context/AccessTokenContext";
import axios from "axios";

const Bookshelf = () => {
  const { getToken, logout } = useContext(AccessTokenContext);

  const [bookshelf, setBookshelf] = useState({});
  const [hasError, setHasError] = useState(false);

  const getBookshelf = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "/api/bookshelf",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setBookshelf(response.data.books);
    } catch (error) {
      setHasError(true);
    }
  };

  const moveBook = async (bookId, shelfKey) => {
    try {
      const response = await axios({
        method: "PUT",
        url: `/api/bookshelf/${bookId}/${shelfKey}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setBookshelf(response.data.books);
    } catch (error) {
      setHasError(true);
    }
  };

  const removeBook = async (bookId) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `/api/bookshelf/${bookId}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setBookshelf(response.data.books);
    } catch (error) {
      setHasError(true);
    }
  };

  useEffect(() => {
    getBookshelf();
  }, []);

  return (
    <div>
      <div>
        <h1>You are logged in!</h1>
        <button onClick={logout}>Logout</button>
      </div>
      {Object.entries(bookshelf).map(([shelf, books]) => {
        return (
          <div key={`shelf-${shelf}`}>
            <h1>{shelf}</h1>
            <div>
              {books.length > 0 ? (
                books.map((book) => {
                  const link = `/book/${book.id}`;
                  return (
                    <div key={`book-${book.id}`}>
                      <Link to={link}>
                        <img
                          src={
                            book.imageLinks
                              ? book.imageLinks.thumbnail
                              : "https://via.placeholder.com/150x200/000000/FFFFFF/?text=No+image"
                          }
                          alt={book.title}
                        />
                      </Link>
                      <div>
                        <Link to={link}>
                          <h2>{book.title ? book.title : "Untitled"}</h2>
                        </Link>
                        {books.authors ? (
                          book.authors.map((author, index) => {
                            return <p key={`${author}-${index}`}>{author}</p>;
                          })
                        ) : (
                          <></>
                        )}
                      </div>
                      <div>
                        <select
                          id="dropdown"
                          type="text"
                          value={book.shelf}
                          onChange={(e) => {
                            e.target.value === "none"
                              ? removeBook(book.id)
                              : moveBook(book.id, e.target.value);
                          }}
                        >
                          <option value="none">None</option>
                          <option value="wantToRead">Want To Read</option>
                          <option value="currentlyReading">
                            Currently Reading
                          </option>
                          <option value="read">Read</option>
                        </select>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  Whoops! Doesn't look like you've added any books here yet!
                </div>
              )}
            </div>
          </div>
        );
      })}

      {hasError && <div>We're sorry, but an unexpected error occurred.</div>}
    </div>
  );
};

export default Bookshelf;
