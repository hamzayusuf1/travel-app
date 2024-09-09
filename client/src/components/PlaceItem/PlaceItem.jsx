import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useSubscription, useQuery } from "@apollo/client";

import Auth from "../../utils/Auth";
import { ADD_LIKE, REMOVE_LIKE, DELETE_PLACE } from "../../utils/mutations";
import { GET_ME } from "../../utils/queries";
import { AppContext } from "../../App";
import LikeButton from "../LikeButton/LikeButton";

import "./PlaceItem.css";
import MapModal from "../Modal/MapModal";
import ErrorModal from "../Modal/ErrorModal";
import { LIKES_SUBSCRIPTION } from "../../utils/subscriptions";

const PlaceItem = (props) => {
  const likes = props.likes;

  //Get user data for post
  const { loading, data } = useQuery(GET_ME);

  //User Context with sign in info
  const { user, setUser } = useContext(AppContext);

  //defining the like button
  const [initialLiked, setInitialLiked] = useState(false);

  //check if the user has liked the post
  useEffect(() => {
    if (
      Auth.loggedIn(localStorage.getItem("id_token")) &&
      props.likes?.find((user) => user._id === localStorage.getItem("uuid"))
    ) {
      setInitialLiked(true);
    } else setInitialLiked(false);
  }, [props.likes]);

  const [addLikes, { error }] = useMutation(ADD_LIKE);
  const [removeLikes, { error2 }] = useMutation(REMOVE_LIKE);

  const [like, setLike] = useState(false);

  const [allLikes, setAllLikes] = useState(0);

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

  const changeLike = async (e) => {
    e.preventDefault();

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
        creator={props.creator}
        id={props.id}
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
            <div className={"flex space-x-4"}></div>
          )}
          {Auth.loggedIn(localStorage.getItem("id_token")) && (
            <div>
              <LikeButton
                id={props.id}
                likes={likes}
                initialLiked={initialLiked}
              />
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
                <p className="font-semibold transition-all hover:font-normal">
                  {props?.creator?.username}
                </p>
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
              {props.id === localStorage.getItem("uuid") && (
                <Link to={`/home/edit/${props.id}`}>
                  <button className="text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-full text-sm px-5 mb-2 mr-6 transition-all">
                    Edit
                  </button>
                </Link>
              )}
              {props.id === localStorage.getItem("uuid") && (
                <button
                  className="text-white bg-red-700 hover:bg-red-800 rounded-full px-4  font-medium mb-2 transition-all"
                  onClick={showDeleteWarningHandler}
                >
                  Delete
                </button>
              )}
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
