import React from "react";
import PlaceItem from "../PlaceItem/PlaceItem";

const PlaceList = ({ places }) => {
  if (places.length === 0) {
    return (
      <div>
        <h2>No places found</h2>
        <button>Share a new place?</button>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex justify-center align-center bg-gray-500 p-6">
      <ul>
        {places.map((place) => {
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
};

export default PlaceList;
