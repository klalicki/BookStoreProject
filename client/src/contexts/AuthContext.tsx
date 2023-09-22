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
  const lsToken = localStorage.getItem("token");
  let startingToken = "";
  if (lsToken) {
    startingToken = lsToken;
  }

  const [token, setToken] = useState(startingToken);
  // login function - takes a username and password, and attempts to log in to the backend
  const login = async (username: string, password: string) => {
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
        localStorage.setItem("token", data.data.token);
        return { successful: true, message: "success" };
      }
    } catch (error: AxiosError | any) {
      if (!error.message) {
        return { successful: false, message: "unspecified error" };
      } else if (error.response.status === 401) {
        return {
          successful: false,
          message: "Error: invalid username or password.",
        };
      } else if (error.response.status === 400) {
        return {
          successful: false,
          message: "Error: You must enter a username and password to login.",
        };
      } else {
        return { successful: false, message: "Error: " + error.message };
      }
    }
  };
  // logout function - clears the auth token
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};
