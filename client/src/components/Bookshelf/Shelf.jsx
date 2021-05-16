import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AccessTokenContext } from "../../context/AccessTokenContext";
import axios from "axios";

const Shelf = () => {
  const { shelf } = useParams();

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

  useEffect(() => {
    getBookshelf();
  }, []);

  const books = bookshelf[shelf];

  return (
    <div>
      <h2 className="lead mb-4">SHELF &gt; {shelf.toUpperCase()}</h2>

      <h1>{shelf}</h1>
      <div>
        {console.log(bookshelf)}
        {books.length > 0 ? (
          books.map((book) => {
            return (
              <div key={`book-${book.id}`}>
                <img src={book.imageLinks.thumbnail} alt={book.title} />
                <div>
                  <h2>{book.title}</h2>
                  {book.authors.map((author, index) => {
                    return <p key={`${author}-${index}`}>{author}</p>;
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <div>Whoops! Doesn't look like you've added any books here yet!</div>
        )}
      </div>
    </div>
  );
};

export default Shelf;
