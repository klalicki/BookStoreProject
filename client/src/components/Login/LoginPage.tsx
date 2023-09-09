import React, { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  type CredentialsType = { username: string; password: string };
  const [credentials, setCredentials] = useState<CredentialsType>({
    username: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // try logging in with credentials
    const status = await login(credentials.username, credentials.password);
    if (status.successful) {
      // login was a success, open bookshelf page
      navigate("/bookshelf");
    } else {
      // login was not successful - display an error message
      alert(status.message);
    }
  };

  return (
    <div>
      <h2>LOGIN PAGE</h2>
      <form onSubmit={handleSubmit}>
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
        <button
          onClick={(e: FormEvent) => {
            e.preventDefault();
            setCredentials({ username: "harry", password: "potter" });
          }}
        >
          fill in correct info
        </button>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default LoginPage;
