import { BrowserRouter as Router, RouterProvider } from "react-router-dom";
import React, { useCallback, useState, useEffect, createContext } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/ApolloClient";

import { Toaster } from "react-hot-toast";
import { AuthContext } from "./context/AuthContext";

import router from "./Layout/Routes";

export const AppContext = createContext(null);

function App() {
  //handle width
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [width]);

  const [user, setUser] = useState({});
  return (
    <AppContext.Provider
      value={{ user: user, setUser: setUser, width, setWidth }}
    >
      <ApolloProvider client={client}>
        <RouterProvider router={router}></RouterProvider>
        <Toaster></Toaster>
      </ApolloProvider>
    </AppContext.Provider>
  );
}

export default App;
