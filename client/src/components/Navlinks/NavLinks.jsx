import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import Button from "../../places/components/Button/button";

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="flex">
      <Link to={"/"}>
        <Button
          className="mx-2"
          color="success"
          disabled={true}
          variant="text"
          value="All Users"
        />
      </Link>

      {auth.isLoggedIn && (
        <Link to={"/:userId/places"}>
          <Button
            color="secondary"
            variant="text"
            value="My Places"
            disabled={true}
          />
        </Link>
      )}
      {auth.isLoggedIn && (
        <Link to={"/places/new"}>
          <Button
            color="inherit"
            variant="text"
            value="Add post"
            disabled={true}
          />
        </Link>
      )}
      {!auth.isLoggedIn && (
        <Link to={"/auth"}>
          <Button
            variant="text"
            value="Authenticate"
            disabled={true}
            color="primary"
          />
        </Link>
      )}
      {auth.isLoggedIn && (
        <Button
          onClick={auth.logout()}
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
