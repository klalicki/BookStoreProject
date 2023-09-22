import React, { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";

const LoginPage = () => {
  const { login, token } = useContext(AuthContext);
  const navigate = useNavigate();
  type CredentialsType = { username: string; password: string };
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [credentials, setCredentials] = useState<CredentialsType>({
    username: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setAlertType("branded");
    setAlertMessage("Logging in...");
    // try logging in with credentials
    const status = await login(credentials.username, credentials.password);
    if (status.successful) {
      // load correct bookshelf count from API:

      // login was a success, open bookshelf page
      navigate("/bookshelf");
    } else {
      // login was not successful - display an error message
      setAlertType("loud");
      setAlertMessage(status.message);
    }
  };
  if (token) {
    return <Navigate to="/bookshelf" />;
  } else {
    return (
      <div className="login-page">
        <h2>Log in to Bookstor.</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-controls">
            <label htmlFor="username">Username</label>
            <input
              onChange={handleInputChange}
              name="username"
              type="text"
              value={credentials.username}
            />

            <label htmlFor="password">Password</label>
            <input
              onChange={handleInputChange}
              type="password"
              name="password"
              value={credentials.password}
            />
          </div>

          <button type="submit">Login</button>
          {alertMessage && (
            <div className={`alert alert-${alertType}`}>{alertMessage}</div>
          )}
        </form>
      </div>
    );
  }
};
export default LoginPage;
