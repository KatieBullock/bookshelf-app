import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
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
    <div>
      <h1>Login</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            required={true}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          Login
        </button>
      </form>
      <p>
        <small>
          The username is <em>harry</em> and the password is <em>potter</em>
        </small>
      </p>
      {isLoading && <p>Loading ...</p>}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default Login;
