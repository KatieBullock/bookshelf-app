const express = require("express");
const axios = require("axios");

const Bookshelves = require("../models/Bookshelves");

const methodNotAllowedError = require("../errors/methodNotAllowed");
const { getUserId, auth } = require("../middleware/auth");

const router = express.Router();
router.use(auth);

router
  .route("/:bookId/:shelf")
  .put((req, res) => {
    const { bookId, shelf } = req.params;
    if (!["wantToRead", "currentlyReading", "read"].includes(shelf)) {
      return res.status(400).send({
        message: `Pst! Shelf '${shelf}' is not an option. Your shelf should be either 'wantToRead', 'currentlyReading', or 'read'.`,
      });
    }

    const userId = getUserId(req);
    const book = Bookshelves.getBook(userId, bookId);
    if (!book) {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
        .then((response) => {
          const { id, volumeInfo } = response.data;
          Bookshelves.updateBookshelf(userId, id, volumeInfo, shelf);
          const books = Bookshelves.getBookshelf(userId);
          return res.send({ books });
        })
        .catch((err) => {
          console.error(err);
          return res
            .status(404)
            .send({ message: `No book with book ID ${bookId} found.` });
        });
    } else {
      Bookshelves.updateBookshelf(userId, book.id, book, shelf);
      const bookshelf = Bookshelves.getBookshelf(userId);
      return res.send({ books: bookshelf });
    }
  })
  .all(methodNotAllowedError);

router
  .route("/:bookId")
  .delete((req, res) => {
    const { bookId } = req.params;

    const userId = getUserId(req);
    const book = Bookshelves.getBook(userId, bookId);
    if (!book) {
      return res.status(404).send({
        message: `No book with book ID ${bookId} found in your bookshelf.`,
      });
    } else {
      Bookshelves.deleteBook(userId, book.id);
      const bookshelf = Bookshelves.getBookshelf(userId);
      return res.send({ books: bookshelf });
    }
  })
  .all(methodNotAllowedError);

router
  .route("/")
  .get((req, res) => {
    const userId = getUserId(req);
    const bookshelf = Bookshelves.getBookshelf(userId);
    res.send({ books: bookshelf });
  })
  .all(methodNotAllowedError);

module.exports = router;
