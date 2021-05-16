import { useContext, useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { AccessTokenContext } from "../../context/AccessTokenContext";

const ProtectedRoute = ({ children, ...restOfProps }) => {
  const { hasToken, refreshToken } = useContext(AccessTokenContext);

  const isLoggedIn = hasToken();

  const [isRefreshing, setIsRefreshing] = useState(!isLoggedIn);

  useEffect(() => {
    if (isRefreshing) refreshToken().then(() => setIsRefreshing(false));
  }, [isRefreshing]);

  if (isRefreshing) return <></>;

  return isLoggedIn ? (
    <Route {...restOfProps}>{children}</Route>
  ) : (
    <Redirect to="/" />
  );
};

export default ProtectedRoute;
