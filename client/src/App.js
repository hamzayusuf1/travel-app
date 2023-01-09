import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useCallback, useState, useEff } from "react";

import Users from "./user/pages/Users";
import Header from "./components/Header/Header";
import UserPlaces from "./places/pages/UserPlaces";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./places/pages/Auth";
import { AuthContext } from "./context/AuthContext";
import { useEffect } from "react";

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
    console.log(validRoutes);
  } else {
    validRoutes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    );
    console.log(validRoutes);
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <Header />
        {validRoutes}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
