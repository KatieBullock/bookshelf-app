import { useState, useEffect, useContext } from "react";
import { AccessTokenContext } from "../../context/AccessTokenContext";
import axios from "axios";

const Bookshelf = () => {
  const { getToken, logout } = useContext(AccessTokenContext);

  const [bookshelf, setBookshelf] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

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
      setErrorMessage("An unexpected error occurred");
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
        console.log([shelf, books]);
        return (
          <div key={`${shelf}`}>
            <h1>{shelf}</h1>
            {books.map((book, index) => {
              return (
                <div key={`book-${index}`}>
                  <img src={book.imageLinks.thumbnail} alt={book.title} />
                  <div>
                    <h2>{book.title}</h2>
                    {book.authors.map((author) => {
                      return <p>{author}</p>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default Bookshelf;
