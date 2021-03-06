import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Flex, HStack, IconButton, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faSearch,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { AccessTokenContext } from "../../context/AccessTokenContext";

const Navbar = () => {
  const location = useLocation();

  const { logout } = useContext(AccessTokenContext);

  const disableSearchLink = () => {
    if (location.pathname === "/search") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Flex
      h={100}
      p={4}
      spacing={4}
      bg={"blue.100"}
      alignItems={"center"}
      justify={"space-between"}
    >
      <HStack spacing={4} display={{ md: "none" }}>
        <Link to="/search">
          <IconButton
            icon={<FontAwesomeIcon icon={faSearch} />}
            aria-label={"Search"}
            variant="ghost"
            colorScheme="blackAlpha"
            disabled={disableSearchLink()}
            style={
              disableSearchLink()
                ? { cursor: "default" }
                : { cursor: "pointer" }
            }
          />
        </Link>
      </HStack>
      <HStack spacing={8} alignItems={"center"}>
        <Link to="/bookshelf">
          <Button
            leftIcon={<FontAwesomeIcon icon={faBookmark} />}
            aria-label={"Bookshelf"}
            variant="ghost"
            colorScheme="blue"
          >
            Bookshelf
          </Button>
        </Link>
        <HStack spacing={4} display={{ base: "none", md: "flex" }}>
          <Link to="/search">
            <Button
              leftIcon={<FontAwesomeIcon icon={faSearch} />}
              aria-label={"Search"}
              variant="ghost"
              colorScheme="blackAlpha"
              disabled={disableSearchLink()}
              style={
                disableSearchLink()
                  ? { cursor: "default" }
                  : { cursor: "pointer" }
              }
            >
              Search
            </Button>
          </Link>
        </HStack>
      </HStack>
      <HStack spacing={4} display={{ md: "none" }}>
        <IconButton
          icon={<FontAwesomeIcon icon={faSignOutAlt} />}
          aria-label={"Logout"}
          variant="ghost"
          colorScheme="blackAlpha"
          onClick={logout}
        />
      </HStack>
      <HStack spacing={4} display={{ base: "none", md: "flex" }}>
        <Button
          leftIcon={<FontAwesomeIcon icon={faSignOutAlt} />}
          aria-label={"Logout"}
          variant="ghost"
          colorScheme="blackAlpha"
          onClick={logout}
        >
          Logout
        </Button>
      </HStack>
    </Flex>
  );
};

export default Navbar;
