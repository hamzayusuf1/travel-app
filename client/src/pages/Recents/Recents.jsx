import React, { useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import Auth from "../../utils/Auth";
import AddPost from "../../components/AddPost/AddPost";

import PlaceItem from "../../components/PlaceItem/PlaceItem";
import { GET_POSTS } from "../../utils/queries";

const Recents = () => {
  const { loading, data, error } = useQuery(GET_POSTS);

  console.log(data);

  const filteredData = data?.places?.filter(
    (place) => !(place.creator._id === localStorage.getItem("uuid"))
  );
  console.log(filteredData);

  const handleImage = () => {};

  // useEffect(async () => {
  //   try {
  //     const { data } = await getPosts();
  //     // console.log(data);
  //     // navigate("/home/recents");
  //   } catch (error) {
  //     console.error(error);
  //     // setErr(error.message);
  //   }
  // }, []);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center mt-20">
        {filteredData?.map((place) => {
          return (
            <PlaceItem
              key={place._id}
              id={place._id}
              image={place.imageURL}
              title={place.title}
              description={place.description}
              address={place.address}
              creatorId={place.creator}
              coordinates={place.location}
              creator={place.creator}
              likes={place.likes}
            />
          );
        })}
      </div>
    </>
  );
};

export default Recents;
