import {
  BrowserRouter as Router,
  Routes,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import React, { useCallback, useState, useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/ApolloClient";

import { Toaster } from "react-hot-toast";
import { AuthContext } from "./context/AuthContext";

import router from "./Layout/Routes";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let validRoutes;

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider
        value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
      >
        <RouterProvider router={router}></RouterProvider>
        <Toaster></Toaster>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
