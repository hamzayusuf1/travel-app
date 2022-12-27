import React from "react";
import reactDom from "react-dom";

const ModalOverlay = () => {
  return reactDom.createPortal(document.getElementById("modal-hook"));
};

const Modal = () => {
  return <div>Modal</div>;
};

export default Modal;
