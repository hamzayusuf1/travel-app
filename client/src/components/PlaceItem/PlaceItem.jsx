import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Delete, Send } from "@mui/icons-material";

import { AuthContext } from "../../context/AuthContext";
import Auth from "../../utils/Auth";

import "./PlaceItem.css";
import Map from "../Modal/Map";
import MapModal from "../Modal/MapModal";
import ErrorModal from "../Modal/ErrorModal";

const PlaceItem = (props) => {
  //TODO - Each post should have edit and delete option only for creator. When connected to backend, we can match this info and show buttons accordingly

  const { isLoggedIn } = useContext(AuthContext);

  const [openModal, setOpenModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setConfirmModal(false);
  };

  const mapOpen = () => {
    setOpenModal(true);
    console.log(props.coordinates);
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
      <div className="max-w-md bg-white hover:bg-gray-100 rounded-lg border border-gray-200 shadow-md mb-5 mx-3">
        <div className="">
          <img
            className="rounded-lg photo"
            src={props.image}
            alt={props.title}
          />
        </div>
        <div className="p-6">
          <h2 className="font-semibold text-3xl text-center mb-2">
            {props.title}
          </h2>
          <p className="text-xl text-center mb-3">{props.description}</p>
        </div>
        <div className="flex justify-evenly mx-3">
          <button
            className="text-center  px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-lightBlue rounded-full border border-gray-200 hover:bg-gray-200 hover:text-blue-700 transition-all"
            onClick={() => setOpenModal(true)}
          >
            View on map
          </button>
          {Auth.loggedIn(localStorage.getItem("id_token")) && (
            <>
              <Link to={`/home/edit/${props.id}`}>
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
      </div>
      {/* <div className="w-[500px] bg-white hover:bg-gray-100 rounded-lg border border-gray-200  ">
        <img className="rounded-lg" src={props.image} alt={props.title} />
      </div> */}
    </>
  );
};

export default PlaceItem;
