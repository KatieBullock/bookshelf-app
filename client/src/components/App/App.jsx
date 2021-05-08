import { AccessTokenProvider } from "../../context/AccessTokenContext";
import AppRouter from "../Routing/AppRouter";

function App() {
  return (
    <AccessTokenProvider>
      <AppRouter />
    </AccessTokenProvider>
  );
}

export default App;
