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

import Users from "./pages/UsersPosts/Users";
import NewPlace from "./pages/NewPlace/NewPlace";
import UpdatePlace from "./pages/UpdatePlace/UpdatePlace";

import { AuthContext } from "./context/AuthContext";
import LoginForm from "./components/Login/LoginForm";

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

  if (isLoggedIn) {
    validRoutes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    );
  } else {
    validRoutes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/getme" element={<LoginForm />} />
      </Routes>
    );
  }

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider
        value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
      >
        {/* <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="home" element={<Users />} />
          </Routes>
        </Router> */}
        <RouterProvider router={router}></RouterProvider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
