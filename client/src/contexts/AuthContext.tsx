import axios, { AxiosError } from "axios";
import { PropsWithChildren, createContext, useState } from "react";

type AuthContextType = {
  token: string;
  login: Function;
  logout: Function;
};
type loginReturnType = {
  successful: boolean;
  message: string;
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
      const data = await axios.post("/api/signin", {
        username: username,
        password: password,
      });
      if (!data.data.token) {
        return {
          successful: false,
          message:
            "the server did not return a token; something is probably wrong with the server.",
        };
      } else {
        setToken(data.data.token);
        return { successful: true, message: "success" };
      }
    } catch (error: AxiosError | any) {
      if (!error.message) {
        return { successful: false, message: "unspecified error" };
      } else {
        return { successful: false, message: error.message };
      }
    }
  };
  // logout function - clears the auth token
  const logout = () => {};

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};
