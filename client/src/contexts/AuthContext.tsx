import { PropsWithChildren, createContext, useState } from "react";
type AuthContextType = {
  token: string;
};
const defaultAuthContext: AuthContextType = { token: "" };
export const AuthContext = createContext(defaultAuthContext);

export const AuthProvider = (props: PropsWithChildren) => {
  // state to hold auth token
  const [token, setToken] = useState("");
  // login function - takes a username and password, and attempts to log in to the backend

  // logout function - clears the auth token

  return (
    <AuthContext.Provider value={{ token }}>
      {props.children}
    </AuthContext.Provider>
  );
};
