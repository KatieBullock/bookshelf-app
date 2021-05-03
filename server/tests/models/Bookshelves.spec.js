const { expect } = require("chai");
const rewire = require("rewire");

const Bookshelves = require("../../models/Bookshelves");
const testBooks = require("../testData/testBooks..json");

const bookshelfRewire = rewire("../../models/Bookshelves");
const resetBookshelf = bookshelfRewire.__get__("resetBookshelf");

describe("models/Bookshelves.js", () => {
  describe("getBookshelf()", () => {
    it("should return a user's entire bookshelf", () => {
      const bookshelf = Bookshelves.getBookshelf("2725");
      expect(bookshelf)
        .to.be.a("object")
        .that.has.all.keys("wantToRead", "currentlyReading", "read");
      expect(bookshelf["wantToRead"][0])
        .to.be.a("object")
        .that.not.have.all.keys("title", "shelf");
      expect(bookshelf["wantToRead"][0].shelf).to.equal("wantToRead");
    });

    it("should not return the user id inside any of the results", () => {
      const bookshelf = Bookshelves.getBookshelf("2725");
      expect(bookshelf["wantToRead"][0]).to.not.have.any.keys("userId");
    });

    it("should return an empty skeleton if a user does not have any books on the bookshelf", () => {
      const bookshelf = Bookshelves.getBookshelf("1234");
      expect(bookshelf).to.deep.equal({
        wantToRead: [],
        currentlyReading: [],
        read: [],
      });
    });

    it("should only return books that belong to a user", () => {
      const bookshelf = Bookshelves.getBookshelf("2725");
      const books = [
        ...Object.values(bookshelf["wantToRead"]),
        ...Object.values(bookshelf["currentlyReading"]),
        ...Object.values(bookshelf["read"]),
      ];
      const book = books.find((book) => book.id === "oy3psgEACAAJ");
      console.log(book);
      expect(book).to.be.undefined;
    });
  });

  describe("getBook()", () => {
    it("should return the book that belongs to a user", () => {
      const book = Bookshelves.getBook("2725", "ppjUtAEACAAJ");
      expect(book).to.be.an("object").that.not.have.all.keys("title", "shelf");
      expect(book.title).to.equal("Fullstack React");
      expect(book.shelf).to.equal("currentlyReading");
    });

    it("should not return the user id inside the results", () => {
      const book = Bookshelves.getBook("2725", "ppjUtAEACAAJ");
      expect(book).to.not.have.any.keys("userId");
    });

    it("should return undefined if no book is found", () => {
      const book = Bookshelves.getBook("2725", "notarealbook");
      expect(book).to.be.undefined;
    });

    it("should only return books that belong to a user", () => {
      const book = Bookshelves.getBook("2725", "oy3psgEACAAJ");
      expect(book).to.be.undefined;
    });
  });

  describe("hasBook()", () => {
    it("should return true is a user has a book", () => {
      const hasBook = Bookshelves.hasBook("2725", "ppjUtAEACAAJ");
      expect(hasBook).to.be.true;
    });

    it("should return false if the book is not on the shelf", () => {
      const hasBook = Bookshelves.hasBook("2725", "notarealbook");
      expect(hasBook).to.be.false;
    });

    it("should return false if the book is on a shelf, but does not belong to the user", () => {
      const hasBook = Bookshelves.hasBook("2725", "oy3psgEACAAJ");
      expect(hasBook).to.be.false;
    });
  });

  describe("findShelfForBook()", () => {
    it("should return the shelf that a user's book is sitting on", () => {
      const shelf = Bookshelves.findShelfForBook("2725", "ppjUtAEACAAJ");
      expect(shelf).to.equal("currentlyReading");
    });

    it("should return none if the book is not on a user's shelf", () => {
      const shelf = Bookshelves.findShelfForBook("2725", "notarealbook");
      expect(shelf).to.equal("none");
    });

    it("should return none if the book is on a shelf, but on another user's bookshelf", () => {
      const shelf = Bookshelves.findShelfForBook("2725", "oy3psgEACAAJ");
      expect(shelf).to.equal("none");
    });
  });

  describe("structureBook()", () => {
    beforeEach(resetBookshelf);

    it("should return book data with id, volume information, description with HTML tags removed, and the shelf", () => {
      const book = Bookshelves.structureBook(
        "wZ69DwAAQBAJ",
        testBooks.wZ69DwAAQBAJ,
        "wantToRead"
      );
      expect(book)
        .to.be.an("object")
        .that.not.have.all.keys("id", "title", "description", "shelf");
      expect(book.title).to.equal("Salmon");
      expect(book.id).to.equal("wZ69DwAAQBAJ");
      expect(book.description).to.equal(
        "WINNER OF THE JOHN AVERY AWARD AT THE ANDRÉ SIMON AWARDS Over the centuries, salmon have been a vital resource, a dietary staple and an irresistible catch. But there is so much more to this extraordinary fish. As Mark Kurlansky reveals, salmon persist as a barometer for the health of our planet. Centuries of our greatest assaults on nature can be seen in their harrowing yet awe-inspiring life cycle. Full of all Kurlansky’s characteristic curiosity and insight, Salmon is a magisterial history of a wondrous creature."
      );
      expect(book.shelf).to.equal("wantToRead");
    });

    it("should not return the user ID", () => {
      const book = Bookshelves.structureBook(
        "wZ69DwAAQBAJ",
        testBooks.wZ69DwAAQBAJ,
        "wantToRead"
      );
      expect(book).to.be.an("object").to.not.have.any.keys("userId");
    });

    it("should throw an error if the new shelf is not wantToRead, currentlyReading, read or none", () => {
      const fn = () => {
        Bookshelves.structureBook(
          "2725",
          "wZ69DwAAQBAJ",
          testBooks.wZ69DwAAQBAJ,
          "buyOnAmazon"
        );
      };
      expect(fn).to.throw();
    });
  });

  describe("updateBookshelf()", () => {
    beforeEach(resetBookshelf);

    it("should add a book to a user's bookshelf if the book is not already on a user's bookshelf", () => {
      Bookshelves.updateBookshelf(
        "5976",
        "wZ69DwAAQBAJ",
        testBooks.wZ69DwAAQBAJ,
        "wantToRead"
      );
      const book = Bookshelves.getBook("5976", "wZ69DwAAQBAJ");
      expect(book).to.be.an("object").that.not.have.all.keys("title", "shelf");
      expect(book.title).to.equal("Salmon");
      expect(book.id).to.equal("wZ69DwAAQBAJ");
      expect(book.shelf).to.equal("wantToRead");
    });

    it("should add a move a user's book from one bookshelf to another if the user has the book on a different shelf", () => {
      Bookshelves.updateBookshelf(
        "5976",
        "wZ69DwAAQBAJ",
        testBooks.wZ69DwAAQBAJ,
        "wantToRead"
      );
      Bookshelves.updateBookshelf(
        "5976",
        "wZ69DwAAQBAJ",
        testBooks.wZ69DwAAQBAJ,
        "currentlyReading"
      );
      const book = Bookshelves.getBook("5976", "wZ69DwAAQBAJ");
      expect(book).to.be.an("object").that.not.have.all.keys("title", "shelf");
      expect(book.title).to.equal("Salmon");
      expect(book.id).to.equal("wZ69DwAAQBAJ");
      expect(book.shelf).to.equal("currentlyReading");
    });

    it("should not change the location of another user's book on the bookshelf", () => {
      Bookshelves.updateBookshelf(
        "2725",
        "wZ69DwAAQBAJ",
        testBooks.wZ69DwAAQBAJ,
        "wantToRead"
      );
      Bookshelves.updateBookshelf(
        "5976",
        "wZ69DwAAQBAJ",
        testBooks.wZ69DwAAQBAJ,
        "currentlyReading"
      );
      Bookshelves.updateBookshelf(
        "5976",
        "wZ69DwAAQBAJ",
        testBooks.wZ69DwAAQBAJ,
        "read"
      );
      const book = Bookshelves.getBook("2725", "wZ69DwAAQBAJ");
      expect(book).to.be.a("object");
      expect(book.id).to.equal("wZ69DwAAQBAJ");
      expect(book.shelf).to.equal("wantToRead");
    });

    it("should throw an error if the new shelf is not wantToRead, currentlyReading, or read", () => {
      const fn = () => {
        Bookshelves.updateBookshelf(
          "2725",
          "wZ69DwAAQBAJ",
          testBooks.wZ69DwAAQBAJ,
          "buyOnAmazon"
        );
      };
      expect(fn).to.throw();
    });
  });
});
