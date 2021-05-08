import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AccessTokenContext } from "../../context/AccessTokenContext";

const ProtectedRoute = ({ children }) => {
  const { hasToken } = useContext(AccessTokenContext);

  const isLoggedIn = hasToken();

  return isLoggedIn ? <Route>{children}</Route> : <Redirect to="/" />;
};

export default ProtectedRoute;
