import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Heading,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { BookshelfContext } from "../../context/BookshelfContext";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Bookshelf = () => {
  const { bookshelf, hasError, getBookshelf, changeShelf, removeBook } =
    useContext(BookshelfContext);

  useEffect(() => {
    getBookshelf();
    // eslint-disable-next-line
  }, []);

  return (
    <Box>
      <Navbar />
      <Stack spacing={4} mx={"auto"} py={12} px={6}>
        {hasError && (
          <Alert status="error" my={4}>
            <AlertIcon />
            We're sorry, but an unexpected error occurred.
          </Alert>
        )}
        {Object.entries(bookshelf).map(([shelf, books]) => {
          let nameOfShelf;
          if (shelf === "wantToRead") {
            nameOfShelf = "Want to Read";
          } else if (shelf === "currentlyReading") {
            nameOfShelf = "Currently Reading";
          } else if (shelf === "read") {
            nameOfShelf = "Read";
          }

          return (
            <Box rounded={"lg"} boxShadow={"lg"} p={8} key={`shelf-${shelf}`}>
              <Heading fontSize={"3xl"}>{nameOfShelf}</Heading>
              {books.length > 0 ? (
                books.map((book) => {
                  const link = `/book/${book.id}`;
                  return (
                    <Flex key={`book-${book.id}`}>
                      <Box>
                        <Link to={link}>
                          <img
                            src={
                              book.imageLinks
                                ? book.imageLinks.thumbnail
                                : "https:via.placeholder.com/150x200/000000/FFFFFF/?text=No+image"
                            }
                            alt={book.title}
                          />
                        </Link>
                      </Box>
                      <Box>
                        <Link to={link}>
                          <Heading fontSize={"2xl"}>
                            {book.title ? book.title : "Untitled"}
                          </Heading>
                        </Link>
                        {book.authors ? (
                          book.authors.map((author, index) => {
                            return (
                              <Text key={`${author}-${index}`}>{author}</Text>
                            );
                          })
                        ) : (
                          <></>
                        )}
                        <Box>
                          <Text fontSize="xs">Change Shelf:</Text>
                          <Select
                            w={"xs"}
                            id="dropdown"
                            type="text"
                            value={book.shelf}
                            onChange={(e) => {
                              e.target.value === "none"
                                ? removeBook(book.id)
                                : changeShelf(book.id, e.target.value);
                            }}
                          >
                            <option value="none">None</option>
                            <option value="wantToRead">Want To Read</option>
                            <option value="currentlyReading">
                              Currently Reading
                            </option>
                            <option value="read">Read</option>
                          </Select>
                        </Box>
                      </Box>
                    </Flex>
                  );
                })
              ) : (
                <div>
                  Whoops! Doesn't look like you've added any books here yet!
                </div>
              )}
            </Box>
          );
        })}
      </Stack>
      <Footer />
    </Box>
  );
};

export default Bookshelf;
