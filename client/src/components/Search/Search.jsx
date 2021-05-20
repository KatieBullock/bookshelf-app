import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AccessTokenContext } from "../../context/AccessTokenContext";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";

const Search = () => {
  const { getToken, logout } = useContext(AccessTokenContext);

  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState("");
  const [noResults, setNoResults] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearchError, setHasSearchError] = useState(false);

  const search = async () => {
    setHasSearchError(false);
    setResults("");
    setNoResults("");
    setIsLoading(true);

    try {
      const response = await axios({
        method: "GET",
        url: `/api/book/search/${searchInput.split(" ").join("+")}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setIsLoading(false);
      response.data.message
        ? setNoResults(response.data.message)
        : setResults(response.data.books);
    } catch (error) {
      setIsLoading(false);
      setHasSearchError(true);
    }
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    search();
  };

  return (
    <div>
      <Navbar />
      <div>
        <h1>You are logged in!</h1>
        <button onClick={logout}>Logout</button>
      </div>
      <form action="submit" onSubmit={handleSubmit}>
        <input type="text" value={searchInput} onChange={handleChange} />
      </form>

      {isLoading && <p>Loading ...</p>}
      {hasSearchError && (
        <div>We're sorry, but an unexpected error occurred.</div>
      )}

      {results ? (
        results.map((result) => {
          const link = `/book/${result.id}`;
          return (
            <div key={result.id}>
              <Link to={link}>
                <img
                  src={
                    result.imageLinks
                      ? result.imageLinks.thumbnail
                      : "https://via.placeholder.com/150x200/000000/FFFFFF/?text=No+image"
                  }
                  alt={result.title}
                />
              </Link>
              <div>
                <Link to={link}>
                  <h2>{result.title ? result.title : "Untitled"}</h2>
                </Link>
                {result.authors ? (
                  result.authors.map((author, index) => {
                    return <p key={`${author}-${index}`}>{author}</p>;
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div>{noResults}</div>
      )}
      <Footer />
    </div>
  );
};

export default Search;
