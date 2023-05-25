import React from "react";
import Modalcss from "../Modal/Modal.css";
import Map from "./Map";
import { Box } from "@mui/material";

const Modal = ({
  open,
  image,
  address,
  onClose,
  coordinates,
  layoutStyles,
}) => {
  const handleClose = (e) => {
    if (e.target.id === "container1") {
      onClose();
    }
  };
  if (!open) return;
  return (
    <div
      className="fixed inset-0 mb-4 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
      id="container1"
      onClick={handleClose}
    >
      <Box sx={layoutStyles} className="modalContainer">
        <button className="closeButton text-black px-2" onClick={onClose}>
          X
        </button>
        <div className="map-container">
          <Map center={coordinates} zoom={16} />
        </div>
      </Box>
    </div>
  );
};

export default Modal;
