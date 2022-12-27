import React from "react";
import { Link } from "react-router-dom";
import NavLinks from "../Navlinks/NavLinks";
import { AppBar, Stack } from "@mui/material";

const Header = () => {
  return (
    <div position="static" className="flex items-center justify-between">
      <div>
        <Link to={"/"}>
          <h1 className="font-semibold">Traveller</h1>
        </Link>
      </div>
      <Stack direction="row" spacing={1}>
        <NavLinks />
      </Stack>
    </div>
  );
};

export default Header;
