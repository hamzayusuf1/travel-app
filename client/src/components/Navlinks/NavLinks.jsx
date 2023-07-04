import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import Auth from "../../utils/Auth";

import Button from "../Button/button";

const NavLinks = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  console.log(isLoggedIn);

  return (
    <div className="flex bg-charcoal justify-center items-center h-[40px]">
      {Auth.loggedIn() && (
        <Link to={"/"}>
          <Button
            className="mx-2"
            color="success"
            disabled={true}
            variant="text"
            value="Logged In Users"
          />
        </Link>
      )}

      <Link>
        <Button
          className="mx-2"
          color="success"
          disabled={true}
          variant="text"
          value="All Users"
        />
      </Link>

      {isLoggedIn && (
        <Link to={"/:userId/places"}>
          <Button
            color="secondary"
            variant="text"
            value="My Places"
            disabled={true}
          />
        </Link>
      )}
      {isLoggedIn && (
        <Link to={"/places/new"}>
          <Button
            color="inherit"
            variant="text"
            value="Add post"
            disabled={true}
          />
        </Link>
      )}
      {!isLoggedIn && (
        <Link to={"/home/auth"}>
          <Button
            variant="text"
            value="Authenticate"
            disabled={true}
            color="primary"
          />
        </Link>
      )}
      {isLoggedIn && (
        <Button
          onClick={logout}
          variant="text"
          value="logout"
          disabled={true}
          color="error"
        />
      )}
    </div>
  );
};

export default NavLinks;
