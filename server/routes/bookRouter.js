const express = require("express");
const axios = require("axios");
const Bookshelves = require("../models/Bookshelves");
const { getUserId } = require("../middleware/auth");

const methodNotAllowedError = require("../errors/methodNotAllowed");

const router = express.Router();

router
  .route("/:bookId")
  .get((req, res) => {
    const { bookId } = req.params;
    const userId = getUserId(req);
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
      .then((response) => {
        const shelf = Bookshelves.findShelfForBook(userId, bookId);
        const book = Bookshelves.structureBook(
          bookId,
          response.data.volumeInfo,
          shelf
        );
        return res.send({ book });
      })
      .catch((err) => {
        console.error(err);
        return res
          .status(404)
          .send({ message: `No book with book ID ${bookId} found.` });
      });
  })
  .all(methodNotAllowedError);

module.exports = router;
