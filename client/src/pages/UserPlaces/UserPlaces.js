import React from "react";
import { useParams } from "react-router-dom";

import PlaceItem from "../../components/PlaceItem/PlaceItem";

const DUMMY_DATA = [
  {
    id: 1,
    title: "empire state building",
    description: "One of the most tallest skyscrapers in the world",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg",
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
  },
  {
    id: 2,
    title: "empire state building",
    description: "One of the most tallest skyscrapers in the world",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg",
    address: "20 W 34th St, New York, NY 10001",
    creator: "u2",
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
  },
  {
    id: 3,
    title: "Burj Khalifa",
    description: "The tallest skyscraper in the world",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg",
    address:
      "Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates",
    creator: "u3",
    location: {
      lat: 25.197197,
      lng: 55.2721877,
    },
  },
];

const UserPlaces = (props) => {
  const { userId } = useParams();
  const userPlaces = DUMMY_DATA.filter(
    (places) => places.creator.trim() === userId
  );
  return (
    <div className="w-full h-full flex justify-center align-center p-6">
      <ul>
        {userPlaces.map((place) => {
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
      </ul>
    </div>
  );
  // <PlaceList places={userPlaces} />;
};

export default UserPlaces;
