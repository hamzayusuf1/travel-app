import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Send } from "@mui/icons-material";
import { AuthContext } from "../../../context/AuthContext";

import Map from "../Modal/Map";
import MapModal from "../Modal/MapModal";
import ErrorModal from "../Modal/ErrorModal";

const PlaceItem = (props) => {
  const { isLoggedIn } = useContext(AuthContext);

  const [openModal, setOpenModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    console.log("deleting...");
  };

  return (
    <>
      <MapModal
        open={openModal}
        image={props.image}
        address={props.address}
        onClose={() => {
          setOpenModal(false);
        }}
        coordinates={props.coordinates}
      />
      <ErrorModal
        open={confirmModal}
        onClose={cancelDeleteHandler}
        layoutStyles={{ width: "75%", bgcolor: "error.main" }}
      />
      <li className="p-6 max-w-sm bg-white hover:bg-gray-100 rounded-lg border border-gray-200 shadow-md mb-5 mx-3">
        <div>
          <img className="" src={props.image} alt={props.title} />
        </div>
        <div>
          <h2 className="font-semibold text-3xl text-center mb-2">
            {props.title}
          </h2>
          <p className="text-xl text-center mb-3">{props.description}</p>
        </div>
        <div className="flex justify-evenly mx-3">
          <button
            className="text-center  px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-200 hover:text-blue-700 transition-all"
            onClick={() => setOpenModal(true)}
          >
            View on map
          </button>
          {isLoggedIn && (
            <>
              <Link to={`/places/${props.id}`}>
                <button className="text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-full text-sm px-5  mr-2 mb-2 transition-all">
                  Edit
                </button>
              </Link>
              <button
                className="text-white bg-red-700 hover:bg-red-800 rounded-full px-4  font-medium mr-2 mb-2 transition-all"
                onClick={showDeleteWarningHandler}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </li>
    </>
  );
};

export default PlaceItem;
