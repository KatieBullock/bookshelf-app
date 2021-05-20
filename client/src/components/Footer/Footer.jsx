import { Link } from "react-router-dom";
import { Box, Stack, ButtonGroup, Button, IconButton } from "@chakra-ui/react";
import { Text } from "@chakra-ui/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faGithubSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      maxW="7xl"
      py="12"
      px={{ base: "4", md: "8" }}
    >
      <Stack>
        <Stack
          direction="row"
          spacing="4"
          align="center"
          justify="space-between"
        >
          <Link to="/bookshelf">
            <Button
              variant="ghost"
              color="gray.600"
              leftIcon={<FontAwesomeIcon icon={faBookmark} size="lg" />}
            >
              Bookshelf
            </Button>
          </Link>
          <ButtonGroup variant="ghost" color="gray.600">
            <IconButton
              as="a"
              href="https://www.linkedin.com/in/klbullock/"
              aria-label="LinkedIn"
              icon={<FontAwesomeIcon icon={faLinkedin} size="lg" />}
            />
            <IconButton
              as="a"
              href="https://github.com/KatieBullock/bookshelf-app"
              aria-label="GitHub"
              icon={<FontAwesomeIcon icon={faGithubSquare} size="lg" />}
            />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm">
          &copy; {new Date().getFullYear()} Katie Bullock. All rights reserved.
        </Text>
      </Stack>
    </Box>
  );
};

export default Footer;
