import { createContext, useContext, useState } from "react";
import { AccessTokenContext } from "./AccessTokenContext";
import axios from "axios";

export const BookshelfContext = createContext();

export function BookshelfProvider({ children }) {
  const { getToken } = useContext(AccessTokenContext);

  const [bookshelf, setBookshelf] = useState("");
  const [hasError, setHasError] = useState(false);

  const getBookshelf = async () => {
    setHasError(false);
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

  const changeShelf = async (bookId, shelfKey) => {
    setHasError(false);
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
    setHasError(false);
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

  return (
    <BookshelfContext.Provider
      value={{ bookshelf, hasError, getBookshelf, changeShelf, removeBook }}
    >
      {children}
    </BookshelfContext.Provider>
  );
}
