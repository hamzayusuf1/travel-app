import React, { useEffect, useState } from "react";
import Auth from "../../utils/Auth";
import { Link } from "react-router-dom";
import { Button, Icon } from "@mui/material/";
import { useMutation } from "@apollo/client";
import { ADD_LIKE } from "../../utils/mutations";

const LikeButton = ({ id, likes, initialLiked }) => {
  const [liked, setLiked] = useState(initialLiked);
  console.log(liked);

  useEffect(() => {
    setLiked(initialLiked);
  }, [liked]);

  //heart SVG
  const heart = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-heart"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke={!liked ? "#2c3e50" : "#DF4747"}
      fill={!liked ? "none" : "#DF4747"}
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
    </svg>
  );

  // useEffect(() => {
  //   if (Auth.loggedIn(localStorage.getItem("id_token"))) {
  //     setLiked(true);
  //   } else setLiked(false);
  // }, [likes]);

  const likeButton = Auth.loggedIn(localStorage.getItem("id_token")) ? (
    <button>
      <Link>{heart}</Link>
    </button>
  ) : (
    <button>
      <Link to={"/home/auth"}>{heart}</Link>
    </button>
  );

  const [addLike, { error }] = useMutation(ADD_LIKE);

  const changeLike = async () => {
    console.log(likes);
    setLiked(!liked);
    try {
      const { data } = await addLike({
        variables: {
          id: id,
        },
      });
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  return (
    <div className="p-6">
      <div className={"flex space-x-4"}>
        <div onClick={changeLike}>{heart}</div>

        {/* Comment SVG */}
        {/* <svg
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
        </svg> */}
      </div>
    </div>
  );
};

export default LikeButton;
