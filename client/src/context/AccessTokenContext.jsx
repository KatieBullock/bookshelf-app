import { createContext, useState } from "react";

export const AccessTokenContext = createContext();

export function AccessTokenProvider({ children }) {
  const [token, setToken] = useState("");

  const getToken = () => token;

  const hasToken = () => {
    if (token) {
      return true;
    } else {
      return false;
    }
  };

  const login = (token) => {
    setToken(token);
  };

  const logout = () => {
    setToken("");
  };

  return (
    <AccessTokenContext.Provider value={{ getToken, hasToken, login, logout }}>
      {children}
    </AccessTokenContext.Provider>
  );
}
