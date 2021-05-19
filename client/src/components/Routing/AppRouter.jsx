import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Bookshelf from "../Bookshelf/Bookshelf";
import BookDetails from "../BookDetails/BookDetails";
import Search from "../Search/Search";
import Login from "../Login/Login";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <ProtectedRoute exact path="/bookshelf">
          <Bookshelf />
        </ProtectedRoute>
        <ProtectedRoute exact path="/search">
          <Search />
        </ProtectedRoute>
        <ProtectedRoute path="/book/:bookId">
          <BookDetails />
        </ProtectedRoute>
        <Route>
          <Redirect to="/bookshelf" />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
