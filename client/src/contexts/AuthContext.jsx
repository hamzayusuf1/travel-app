import { createContext, useReducer, useContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
