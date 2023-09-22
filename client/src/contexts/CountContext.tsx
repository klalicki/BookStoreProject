import { PropsWithChildren, createContext, useState } from "react";
type CountContextType = {
  count: number;
  setCount: Function;
};
const defaultCount: CountContextType = { count: 0, setCount: () => {} };
export const CountContext = createContext(defaultCount);

export const CountContextProvider = (props: PropsWithChildren) => {
  const [count, setCount] = useState(0);
  return (
    <CountContext.Provider value={{ count, setCount }}>
      {props.children}
    </CountContext.Provider>
  );
};
