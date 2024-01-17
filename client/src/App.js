import { BrowserRouter as Router, RouterProvider } from "react-router-dom";
import React, { useCallback, useState, useEffect, createContext } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/ApolloClient";

import { Toaster } from "react-hot-toast";
import { AuthContext } from "./context/AuthContext";

import router from "./Layout/Routes";

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      <ApolloProvider client={client}>
        <RouterProvider router={router}></RouterProvider>
        <Toaster></Toaster>
      </ApolloProvider>
    </UserContext.Provider>
  );
}

export default App;
