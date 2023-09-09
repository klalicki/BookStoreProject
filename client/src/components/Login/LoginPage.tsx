import React, { ChangeEvent } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  type CredentialsType = { username: string; password: string };
  const [credentials, setCredentials] = useState<CredentialsType>({
    username: "sss",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // try logging in with credentials
    login(credentials.username, credentials.password);
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default LoginPage;
