import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useSubscription, useQuery } from "@apollo/client";
import { Button } from "@mui/material";
import { Delete, Send } from "@mui/icons-material";

import { AuthContext } from "../../context/AuthContext";
import Auth from "../../utils/Auth";
import { ADD_LIKE, REMOVE_LIKE } from "../../utils/mutations";
import { GET_ME } from "../../utils/queries";

import "./PlaceItem.css";
import Map from "../Modal/Map";
import MapModal from "../Modal/MapModal";
import ErrorModal from "../Modal/ErrorModal";
import { LIKES_SUBSCRIPTION } from "../../utils/subscriptions";

const PlaceItem = (props) => {
  //Get user data for post
  const { loading, data } = useQuery(GET_ME);

  // console.log(props.creator.username);

  const userData = data?.user || {};

  const [addLikes, { error }] = useMutation(ADD_LIKE);
  const [removeLikes, { error2 }] = useMutation(REMOVE_LIKE);
  const { likesSub, error3 } = useSubscription(LIKES_SUBSCRIPTION);

  const [like, setLike] = useState(false);

  const [allLikes, setAllLikes] = useState(0);

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

  // useEffect(async () => {
  //   try {
  //     const { data } = await likesSub({
  //       variables: { postID: props.id },
  //     });
  //   } catch (error) {
  //     console.log(JSON.stringify(error));
  //   }
  // }, []);

  const changeLike = async (e) => {
    e.preventDefault();

    // if (!like) {
    //   try {
    //     const { data } = await addLike({
    //       variables: {
    //         id: props.id,
    //       },
    //     });
    //     setLike(true);
    //   } catch (error) {}

    if (!like) {
      try {
        const { data } = await addLikes({
          variables: { id: props.id },
        });
        setLike(true);
      } catch (error) {
        console.log(JSON.stringify(error));
      }
    } else {
      try {
        const { data } = await removeLikes({
          variables: {
            id: props.id,
          },
        });
        setLike(false);
      } catch (error) {}
    }
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
      <div className="md:w-[446px] bg-black w-[396px] bg-white hover:bg-gray-100 rounded-lg border border-gray-200 shadow-md mb-5 mx-3">
        <div className="">
          <img
            className="rounded-lg photo"
            src={props.image ? props.image : "/images/empire.jpg"}
            alt={props.title}
          />
        </div>
        <div className="p-6">
          {Auth.loggedIn(localStorage.getItem("id_token")) && (
            <div className={"flex space-x-4"}>
              <div onClick={changeLike}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-heart"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke={!like ? "#2c3e50" : "#DF4747"}
                  fill={!like ? "none" : "#DF4747"}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                </svg>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-message-circle-off"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M8.595 4.577c3.223 -1.176 7.025 -.61 9.65 1.63c2.982 2.543 3.601 6.523 1.636 9.66m-1.908 2.109c-2.787 2.19 -6.89 2.666 -10.273 1.024l-4.7 1l1.3 -3.9c-2.229 -3.296 -1.494 -7.511 1.68 -10.057" />
                <path d="M3 3l18 18" />
              </svg>
            </div>
          )}
          {/* no of likes and user who posted section */}
          <div className="flex justify-between items-center mt-4 mb-1">
            <p className=" text-sm font-montserrat">
              {`Liked by  `}{" "}
              <span className="font-semibold font-montserrat">{`${allLikes} others`}</span>
            </p>
            <Link to={`/home/dashboard/${props?.creator?._id}`}>
              {Auth.loggedIn(localStorage.getItem("id_token")) && (
                <p className="font-medium">{props?.creator?.username}</p>
              )}
            </Link>
          </div>
          <h2 className="font-semibold text-2xl  mb-1">{props.title}</h2>
          <p className="text-lg text-gray-700 mb-3">{props.description}</p>
        </div>
        <div className="flex justify-center">
          <button
            className="text-center  px-5 mr-6 mb-2 text-sm font-medium text-gray-900 bg-lightBlue rounded-full border border-gray-200 hover:bg-gray-200 hover:text-blue-700 transition-all"
            onClick={() => setOpenModal(true)}
          >
            View on map
          </button>
          {Auth.loggedIn(localStorage.getItem("id_token")) && (
            <>
              <Link to={`/home/edit/${props.id}`}>
                <button className="text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-full text-sm px-5 mb-2 mr-6 transition-all">
                  Edit
                </button>
              </Link>
              <button
                className="text-white bg-red-700 hover:bg-red-800 rounded-full px-4  font-medium mb-2 transition-all"
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
