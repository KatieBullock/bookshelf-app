import { Link } from "react-router-dom";
import { Flex, Stack, Button, IconButton, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faGithubSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <Flex
      p={4}
      spacing={4}
      direction={{ base: "column", md: "row" }}
      justify={{ base: "center", md: "space-between" }}
      align={{ base: "center", md: "center" }}
    >
      <Link to="/bookshelf">
        <Button
          leftIcon={<FontAwesomeIcon icon={faBookmark} />}
          aria-label="Bookshelf"
          variant="ghost"
          colorScheme="blue"
        >
          Bookshelf
        </Button>
      </Link>
      <Text>
        &copy; {new Date().getFullYear()} Katie Bullock. All rights reserved.
      </Text>
      <Stack direction={"row"} spacing={2}>
        <IconButton
          as="a"
          href="https://www.linkedin.com/in/klbullock/"
          icon={<FontAwesomeIcon icon={faLinkedin} size="lg" />}
          aria-label="LinkedIn"
          variant="ghost"
          colorScheme="linkedin"
        />
        <IconButton
          as="a"
          href="https://github.com/KatieBullock/bookshelf-app"
          icon={<FontAwesomeIcon icon={faGithubSquare} size="lg" />}
          aria-label="GitHub"
          variant="ghost"
          colorScheme="blackAlpha"
        />
      </Stack>
    </Flex>
  );
};

export default Footer;
