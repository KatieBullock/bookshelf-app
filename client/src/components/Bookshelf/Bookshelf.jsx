import { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
import { AccessTokenContext } from "../../context/AccessTokenContext";
// import Shelf from "../Bookshelf/Shelf";
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

  useEffect(() => {
    getBookshelf();
  }, []);

  return (
    <div>
      <div>
        <h1>You are logged in!</h1>
        <button onClick={logout}>Logout</button>
      </div>
      {/* <div>
        <h2>
          <Link to="/bookshelf">all</Link>
        </h2>
      </div> */}
      {/* {Object.entries(bookshelf).map(([shelf, books]) => {
        const link = `/bookshelf/${shelf}`;
        return (
          <div key={`shelf-${shelf}`}>
            <h2>
              <Link to={link}>{shelf}</Link>
            </h2>
          </div>
        );
      })} */}
      {Object.entries(bookshelf).map(([shelf, books]) => {
        return (
          <div key={`shelf-${shelf}`}>
            <h1>{shelf}</h1>
            <div>
              {books.length > 0 ? (
                books.map((book) => {
                  return (
                    <div key={`book-${book.id}`}>
                      <img
                        src={
                          book.imageLinks
                            ? book.imageLinks.thumbnail
                            : "https://picsum.photos/200/300"
                        }
                        alt={book.title}
                      />
                      <div>
                        <h2>{book.title}</h2>
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
                            moveBook(book.id, e.target.value);
                          }}
                        >
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
