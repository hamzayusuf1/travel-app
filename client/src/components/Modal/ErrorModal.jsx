import React, { useState } from "react";
import { Box } from "@mui/material";
import { useMutation } from "@apollo/client";

import { DELETE_PLACE } from "../../utils/mutations";

import Button from "../Button/button";
import { useNavigate } from "react-router-dom";

const ErrorModal = ({ open, layoutStyles, onClose, creator, id }) => {
  const navigate = useNavigate();

  const onClick = (e) => {
    if (e.target.id === "container1") {
      onClose();
    }
  };
  const [deletePlace, { error }] = useMutation(DELETE_PLACE);

  const handleDelete = async () => {
    console.log(creator._id);

    try {
      const { data } = await deletePlace({
        variables: {
          placeId: id,
          creator: creator._id,
        },
      });
      console.log(data);
      navigate("/home/recents");
      navigate(0);
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };

  return (
    <Box>
      {open && (
        <div
          className="fixed inset-0 mb-4 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center "
          id="container1"
          onClick={onClick}
        >
          <div className="w-4/5 h-2/5 bg-white flex flex-col justify-between rounded-lg">
            <div className="bg-sky-500 flex flex-col items-center p-4">
              <p className="text-center text-3xl font-semibold">
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
                onClick={handleDelete}
              ></Button>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

export default ErrorModal;
