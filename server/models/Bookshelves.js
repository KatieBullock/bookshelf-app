const cloneDeep = require("lodash.clonedeep");
const stripHtml = require("string-strip-html").stripHtml;
const starterBookshelves = require("../assets/starterBookshelves.json");

/**
 * Usually, we would store our data in a database instead of a plain text file
 * that we are committing to git. However, for the purposes of demonstrating
 * the front-end of student portfolio piece, this works fine.
 */
let Bookshelves;

/**
 * For testing
 */
const resetBookshelf = () => {
  Bookshelves = cloneDeep(starterBookshelves);
};

const getBookshelf = (userId) => {
  const skeleton = {
    wantToRead: [],
    currentlyReading: [],
    read: [],
  };
  return Bookshelves.reduce((bookshelf, book) => {
    const { userId: bookUserId, ...restOfBook } = book;
    if (bookUserId === userId) {
      bookshelf[book.shelf].push(restOfBook);
    }
    return bookshelf;
  }, skeleton);
};

const getBook = (userId, bookId) => {
  const book = Bookshelves.find(
    (book) => book.id === bookId && book.userId === userId
  );
  if (book) {
    const { userId, ...restOfBook } = book;
    return restOfBook;
  }
  return book;
};

const hasBook = (userId, bookId) => {
  return !!getBook(userId, bookId);
};

const findShelfForBook = (userId, bookId) => {
  const book = getBook(userId, bookId);
  return book ? book.shelf : "none";
};

const structureBook = (bookId, volumeInfo, shelf) => {
  if (!["wantToRead", "currentlyReading", "read", "none"].includes(shelf))
    throw new Error(`Shelf "${shelf}" does not exist`);

  return {
    id: bookId,
    ...volumeInfo,
    description: volumeInfo.description
      ? stripHtml(volumeInfo.description).result
      : "",
    shelf,
  };
};

const insertBook = (userId, bookId, volumeInfo, shelf) => {
  Bookshelves.push({
    ...structureBook(bookId, volumeInfo, shelf),
    userId,
  });
};

const deleteBook = (userId, bookId) => {
  Bookshelves = Bookshelves.filter(
    (book) => !(book.id === bookId && book.userId === userId)
  );
};

const updateBookshelf = (userId, bookId, volumeInfo, shelf) => {
  deleteBook(userId, bookId);
  insertBook(userId, bookId, volumeInfo, shelf);
};

resetBookshelf();

module.exports = {
  getBookshelf,
  getBook,
  hasBook,
  findShelfForBook,
  structureBook,
  deleteBook,
  updateBookshelf,
};
