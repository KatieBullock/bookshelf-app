import { AccessTokenProvider } from "../../context/AccessTokenContext";
import { BookshelfProvider } from "../../context/BookshelfContext";
import AppRouter from "../Routing/AppRouter";

function App() {
  return (
    <AccessTokenProvider>
      <BookshelfProvider>
        <AppRouter />
      </BookshelfProvider>
    </AccessTokenProvider>
  );
}

export default App;
