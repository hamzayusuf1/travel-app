import React, { useState } from "react";
import { Box } from "@mui/material";

import Button from "../Button/button";

const ErrorModal = ({ open, layoutStyles, onClose }) => {
  const onClick = (e) => {
    if (e.target.id === "container1") {
      onClose();
    }
  };

  return (
    <Box>
      {open && (
        <div
          className="fixed inset-0 mb-4 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
          id="container1"
          onClick={onClick}
        >
          <div className="w-4/5 h-2/5 bg-white flex flex-col justify-between">
            <div className="bg-sky-500 h-16 flex flex-col items-center">
              <p className="text-center text-3xl mt-3 font-semibold">
                Are you sure you want to delete this post?
              </p>
            </div>
            <div>
              <p className="text-2xl text-center">
                If you proceed with this deletion, the change cannot be undone
              </p>
            </div>

            <div className="mx-3 flex justify-end my-4">
              <Button
                disabled={true}
                type="submit"
                value={"CANCEL"}
                variant="outlined"
                size="large"
                color="error"
                onClick={onClose}
              ></Button>
              <Button
                type="submit"
                disabled={true}
                value={"Yes"}
                variant="contained"
                size="large"
              ></Button>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

export default ErrorModal;
