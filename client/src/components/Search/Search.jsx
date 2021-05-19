import { useState, useEffect, useContext } from "react";
import { AccessTokenContext } from "../../context/AccessTokenContext";
import axios from "axios";

const Search = () => {
  const { getToken, logout } = useContext(AccessTokenContext);

  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState("");
  const [noResults, setNoResults] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState("");

  const search = async () => {
    setHasError("");
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
      setHasError(true);
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
      <div>
        <h1>You are logged in!</h1>
        <button onClick={logout}>Logout</button>
      </div>
      <form action="submit" onSubmit={handleSubmit}>
        <input type="text" value={searchInput} onChange={handleChange} />
      </form>
      {isLoading && <p>Loading ...</p>}
      {hasError && <div>We're sorry, but an unexpected error occurred.</div>}
      {results ? (
        results.map((result) => {
          return (
            <div key={result.id}>
              <img
                src={
                  result.imageLinks
                    ? result.imageLinks.thumbnail
                    : "https://picsum.photos/200/300"
                }
                alt={result.title}
              />
              <div>
                <h2>{result.title}</h2>
                {results.authors ? (
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
    </div>
  );
};

export default Search;
