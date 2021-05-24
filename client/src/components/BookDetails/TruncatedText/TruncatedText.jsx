import { useState } from "react";
import { Box, Text, Button } from "@chakra-ui/react";

const TruncatedText = ({ text, maxLength }) => {
  const [truncatedText, setTruncatedText] = useState(maxLength);

  return (
    <Box m={2}>
      {text.length <= maxLength ? (
        <Text>{text}</Text>
      ) : (
        <Box>
          <Text>
            {text.substring(0, truncatedText)}
            {truncatedText === maxLength ? "..." : ""}
          </Text>
          {truncatedText === maxLength ? (
            <Button
              type="button"
              size={"xs"}
              variant={"ghost"}
              colorScheme={"blue"}
              onClick={() => {
                setTruncatedText(text.length);
              }}
            >
              Read More
            </Button>
          ) : (
            <Button
              type="button"
              size={"xs"}
              variant={"ghost"}
              colorScheme={"blue"}
              onClick={() => {
                setTruncatedText(maxLength);
              }}
            >
              Read Less
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default TruncatedText;
