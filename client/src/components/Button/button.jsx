import React, { useContext } from "react";
import { CgAddR } from "react-icons/cg";
import { Button } from "@mui/material/";

import ButtonCSS from "../Button/Button.css";

const customButton = (props) => {
  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: "#A3A6AC",
  //     },
  //   },
  // });
  return (
    <div className="flex justify-center items-center  mx-4">
      <Button
        variant={props.variant}
        disabled={!props.disabled}
        type={props.type}
        size={props.size}
        color={props.bgColor}
        onClick={props.onClick}
        sx={{ color: props.textColor }}
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

export default customButton;
