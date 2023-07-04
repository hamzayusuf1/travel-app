import React, { useContext } from "react";
import { CgAddR } from "react-icons/cg";
import { Button } from "@mui/material/";

import ButtonCSS from "../Button/Button.css";

const button = (props) => {
  return (
    <div className="flex justify-center items-center  mx-4">
      <Button
        variant={props.variant}
        disabled={!props.disabled}
        type={props.type}
        size={props.size}
        color={props.color}
        onClick={props.onClick}
      >
        {props.value}
      </Button>

      {/* <button
        disabled={props.disabled}
        onClick={props.onClick}
        type={props.type}
      >
        {props.value}
      </button> */}
    </div>
  );
};

export default button;
