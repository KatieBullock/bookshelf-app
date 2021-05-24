import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Flex,
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Spinner,
  Heading,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { AccessTokenContext } from "../../context/AccessTokenContext";
import axios from "axios";

const Login = () => {
  const history = useHistory();

  const { login } = useContext(AccessTokenContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await axios({
        method: "POST",
        url: "/api/signin",
        headers: {
          "Content-Type": "application/json",
        },
        data: { username: username, password: password },
      });
      setIsLoading(false);
      login(response.data.token);
      history.push("/bookshelf");
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid username or password");
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack mx={"auto"} maxW={"lg"} py={8} px={6}>
        <Box rounded={"lg"} boxShadow={"lg"} p={8}>
          <Stack align={"center"}>
            <Heading fontSize={"3xl"}>Login</Heading>
          </Stack>
          {errorMessage && (
            <Alert status="error" my={4}>
              <AlertIcon />
              {errorMessage}
            </Alert>
          )}
          <form method="POST" onSubmit={handleSubmit}>
            <Stack spacing={4} my={4}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  required={true}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  required={true}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button type="submit" disabled={isLoading} colorScheme={"blue"}>
                  {isLoading ? <Spinner /> : "Login"}
                </Button>
              </Stack>
            </Stack>
          </form>
          <Text fontSize="sm">
            Try <em>harry</em> and <em>potter</em> or <em>hermione</em> and{" "}
            <em>granger</em>
          </Text>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
