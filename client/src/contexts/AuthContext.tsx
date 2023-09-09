import { PropsWithChildren, createContext, useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = (props: PropsWithChildren) => {
  // state to hold auth token
  const [token, setToken] = useState("");
  // login function - takes a

  return (
    <AuthContext.Provider value={{ token }}>
      {props.children}
    </AuthContext.Provider>
  );
};
