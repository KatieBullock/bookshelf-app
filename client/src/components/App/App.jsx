import { AccessTokenProvider } from "../../context/AccessTokenContext";
import { BookshelfProvider } from "../../context/BookshelfContext";
import { ChakraProvider } from "@chakra-ui/react";
import AppRouter from "../Routing/AppRouter";

function App() {
  return (
    <ChakraProvider>
      <AccessTokenProvider>
        <BookshelfProvider>
          <AppRouter />
        </BookshelfProvider>
      </AccessTokenProvider>
    </ChakraProvider>
  );
}

export default App;
