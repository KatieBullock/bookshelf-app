import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Box,
  Stack,
  Image,
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
      <Stack
        spacing={4}
        alignSelf={"center"}
        w={"90%"}
        mx={"auto"}
        py={8}
        px={6}
      >
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
              <Heading fontSize={"2xl"} p={2}>
                {nameOfShelf}
              </Heading>
              {books.length > 0 ? (
                books.map((book) => {
                  const link = `/book/${book.id}`;
                  return (
                    <Flex
                      key={`book-${book.id}`}
                      maxW={"6xl"}
                      direction={{ base: "column", md: "row" }}
                      justify={{ base: "center", md: "flex-start" }}
                      alignItems={{ base: "flex-start", md: "center" }}
                    >
                      <Box p={2}>
                        <Link to={link}>
                          <Image
                            src={
                              book.imageLinks
                                ? book.imageLinks.thumbnail
                                : "https:via.placeholder.com/150x200/2B6CB0/FFFFFF/?text=No+image"
                            }
                            alt={book.title}
                          />
                        </Link>
                      </Box>
                      <Box p={2}>
                        <Link to={link}>
                          <Heading fontSize={"xl"} color={"blue.600"}>
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
                        <Box my={2}>
                          <Text fontSize="xs" p={1}>
                            Change Shelf:
                          </Text>
                          <Select
                            type="text"
                            w={"fit-content"}
                            size={"sm"}
                            focusBorderColor={"blue.100"}
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
                <Flex
                  maxW={"6xl"}
                  direction={{ base: "column", md: "row" }}
                  justify={{ base: "center", md: "flex-start" }}
                >
                  <Alert status="warning" my={2}>
                    <AlertIcon />
                    There's nothing here yet... Let's get reading!
                  </Alert>
                </Flex>
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
