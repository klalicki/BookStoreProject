import axios from "axios";
import { PropsWithChildren, createContext, useState } from "react";

type AuthContextType = {
  token: string;
  login: Function;
  logout: Function;
};
const defaultAuthContext: AuthContextType = {
  token: "",
  login: () => {},
  logout: () => {},
};
export const AuthContext = createContext(defaultAuthContext);

export const AuthProvider = (props: PropsWithChildren) => {
  // state to hold auth token
  const [token, setToken] = useState("");
  // login function - takes a username and password, and attempts to log in to the backend
  const login = async (username: string, password: string) => {
    console.log("login function");
    try {
      const data = await axios.post("http://localhost:3001/api/signin", {
        username: username,
        password: password,
      });
      if (!data.data.token) {
        throw Error(
          "the server did not return a token; something might be wrong with the server!"
        );
      } else {
        setToken(data.data.token);
      }
    } catch {}
  };
  // logout function - clears the auth token
  const logout = () => {};

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};
