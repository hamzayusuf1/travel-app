import React, { useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import PlaceItem from "../../components/PlaceItem/PlaceItem";
import { GET_POSTS } from "../../utils/queries";

const DUMMY_DATA = [
  {
    id: 1,
    title: "empire state building",
    description: "One of the most tallest skyscrapers in the world",
    imageURL: "/images/empire.jpg",
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
  },

  {
    id: 3,
    title: "Burj Khalifa",
    description: "The tallest skyscraper in the world",
    imageURL: "/images/burj.jpg",
    address:
      "Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates",
    creator: "u3",
    location: {
      lat: 25.197197,
      lng: 55.2721877,
    },
  },

  {
    id: 2,
    title: "empire state building",
    description: "One of the most tallest skyscrapers in the world",
    imageURL: "/images/empire.jpg",
    address: "20 W 34th St, New York, NY 10001",
    creator: "u2",
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
  },
];

const Recents = () => {
  const { loading, data, error } = useQuery(GET_POSTS);

  console.log(data);

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
    <div className="w-full flex flex-col justify-center items-center">
      {data.places.map((place) => {
        return (
          <PlaceItem
            key={place.id}
            id={place.id}
            image={place.imageURL}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creator}
            coordinates={place.location}
          />
        );
      })}
    </div>
  );
};

export default Recents;
