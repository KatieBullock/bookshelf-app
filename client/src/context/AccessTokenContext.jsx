import { createContext, useState } from "react";
import axios from "axios";

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
    axios({
      method: "DELETE",
      url: "/api/signout",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setToken("");
  };

  const refreshToken = () => {
    return axios
      .request({
        method: "GET",
        url: "/api/refresh",
      })
      .then((response) => {
        setToken(response.data.token);
      })
      .catch((error) => {
        console.log("error", error);
        if (error.response && error.response.status === 401) {
        }
      });
  };

  return (
    <AccessTokenContext.Provider
      value={{ getToken, hasToken, login, logout, refreshToken }}
    >
      {children}
    </AccessTokenContext.Provider>
  );
}
