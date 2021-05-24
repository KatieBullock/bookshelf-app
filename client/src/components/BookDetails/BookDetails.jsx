import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Flex,
  Box,
  Image,
  Select,
  Heading,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { AccessTokenContext } from "../../context/AccessTokenContext";
import { BookshelfContext } from "../../context/BookshelfContext";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import TruncatedText from "./TruncatedText/TruncatedText";
import axios from "axios";

const BookDetails = () => {
  const { getToken } = useContext(AccessTokenContext);
  const { bookshelf, changeShelf, removeBook } = useContext(BookshelfContext);

  const { bookId } = useParams();

  const [book, setBook] = useState("");
  const [hasError, setHasError] = useState("");

  const viewDetails = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `/api/book/${bookId}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setBook(response.data.book);
    } catch (error) {
      setHasError(true);
    }
  };

  useEffect(() => {
    viewDetails();
    // eslint-disable-next-line
  }, [bookshelf]);

  return (
    <Box>
      <Navbar />
      <Box w={"90%"} mx={"auto"} py={12} px={6}>
        {hasError && (
          <Alert status="error" my={4}>
            <AlertIcon />
            We're sorry, but an unexpected error occurred.
          </Alert>
        )}
        <Box rounded={"lg"} boxShadow={"lg"} p={8}>
          <Heading fontSize={"2xl"} m={2} p={2}>
            {book.title}
          </Heading>
          <Flex
            alignSelf={"center"}
            direction={{ base: "column", md: "row" }}
            justify={{ base: "center", md: "flex-start" }}
            alignItems={{ base: "flex-start", md: "flex-start" }}
          >
            <Image
              m={2}
              p={2}
              src={
                book.imageLinks
                  ? book.imageLinks.thumbnail
                  : "https://via.placeholder.com/150x200/2B6CB0/FFFFFF/?text=No+image"
              }
              alt={book.title}
            />
            <Box p={2}>
              {book.authors ? (
                book.authors.length > 1 ? (
                  <Flex m={2} direction={"column"}>
                    Authors:
                    <Flex direction={"column"}>
                      {book.authors.map((author, index) => {
                        return <Text key={`${author}-${index}`}>{author}</Text>;
                      })}
                    </Flex>
                  </Flex>
                ) : (
                  <Flex m={2} direction={"column"}>
                    Author: <Text>{book.authors}</Text>
                  </Flex>
                )
              ) : (
                <Text m={2}>Author Unavailable</Text>
              )}
              <TruncatedText
                text={
                  book.description
                    ? book.description
                    : "No description available"
                }
                maxLength={500}
              />
              <Box m={2}>
                {book.publisher
                  ? `Publisher: ${book.publisher}`
                  : "Publisher Unavailable"}
              </Box>
              <Box m={2}>
                {book.publishedDate
                  ? `Published Date: ${book.publishedDate}`
                  : "Published Date Unavailable"}
              </Box>
              <Box m={2}>
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
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="read">Read</option>
                </Select>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default BookDetails;
