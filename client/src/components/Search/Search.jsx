import { useState, useEffect, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Flex,
  Box,
  Stack,
  Image,
  InputGroup,
  InputLeftElement,
  Input,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { AccessTokenContext } from "../../context/AccessTokenContext";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";

const Search = () => {
  const history = useHistory();
  const location = useLocation();

  const { getToken } = useContext(AccessTokenContext);

  const [searchInput, setSearchInput] = useState(
    location.state && location.state.update ? location.state.update : ""
  );
  const [results, setResults] = useState("");
  const [noResults, setNoResults] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearchError, setHasSearchError] = useState(false);

  useEffect(() => {
    if (location.state && location.state.update) {
      search();
    }
  }, []);

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
    history.push({
      pathname: "/search",
      state: {
        update: searchInput,
      },
    });
  };

  return (
    <Box>
      <Navbar />
      <Stack mx={"auto"} py={12} px={10}>
        <Box p={2}>
          <form action="submit" onSubmit={handleSubmit}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FontAwesomeIcon icon={faSearch} />}
              />
              <Input
                type="text"
                placeholder="Search"
                value={searchInput}
                onChange={handleChange}
              />
            </InputGroup>
          </form>
        </Box>
        {isLoading && <Spinner size="xl" />}
        {hasSearchError && (
          <Alert status="error" my={4}>
            <AlertIcon />
            We're sorry, but an unexpected error occurred.
          </Alert>
        )}
        {results ? (
          results.map((result) => {
            const link = `/book/${result.id}`;
            return (
              <Flex
                key={result.id}
                maxW={"6xl"}
                direction={{ base: "column", md: "row" }}
                justify={{ base: "center", md: "flex-start" }}
                alignItems={{ base: "flex-start", md: "center" }}
              >
                <Box p={2}>
                  <Link to={link}>
                    <Image
                      src={
                        result.imageLinks
                          ? result.imageLinks.thumbnail
                          : "https://via.placeholder.com/150x200/000000/FFFFFF/?text=No+image"
                      }
                      alt={result.title}
                    />
                  </Link>
                </Box>
                <Box p={2}>
                  <Link to={link}>
                    <Heading fontSize={"xl"}>
                      {result.title ? result.title : "Untitled"}
                    </Heading>
                  </Link>
                  {result.authors ? (
                    result.authors.map((author, index) => {
                      return <Text key={`${author}-${index}`}>{author}</Text>;
                    })
                  ) : (
                    <></>
                  )}
                </Box>
              </Flex>
            );
          })
        ) : noResults ? (
          <Flex
            maxW={"6xl"}
            direction={{ base: "column", md: "row" }}
            justify={{ base: "center", md: "flex-start" }}
          >
            <Alert status="warning">
              <AlertIcon />
              {noResults}
            </Alert>
          </Flex>
        ) : (
          <></>
        )}
      </Stack>
      <Footer />
    </Box>
  );
};

export default Search;
