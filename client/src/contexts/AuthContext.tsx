import { PropsWithChildren, createContext, useState } from "react";
type AuthContextType = {
  token?: string;
  login?: Function;
  logout?: Function;
};
const defaultAuthContext: AuthContextType = {};
export const AuthContext = createContext(defaultAuthContext);

export const AuthProvider = (props: PropsWithChildren) => {
  // state to hold auth token
  const [token, setToken] = useState("");
  // login function - takes a username and password, and attempts to log in to the backend
  const login = (username: string, password: string) => {};
  // logout function - clears the auth token
  const logout = () => {};

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};
