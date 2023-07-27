import {
  BrowserRouter as Router,
  Routes,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import React, { useCallback, useState, useEffect } from "react";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { Landing, Auth, UserPlaces } from "./pages";
import { AuthContext } from "./context/AuthContext";

import router from "./Layout/Routes";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  //configure client to execute the 'authlink' middleware prior to every request to the backend
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

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
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
