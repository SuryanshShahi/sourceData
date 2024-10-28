import { createContext } from "react";

export const GlobalContext = createContext<{
  data: { [key: string]: any };
  setData: (data: { [key: string]: any }) => void;
}>({
  data: {},
  setData: () => {},
});
