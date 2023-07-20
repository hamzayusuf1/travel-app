import React from "react";

import PlaceItem from "../../components/PlaceItem/PlaceItem";

const DUMMY_USERS = [
  {
    followers: 2,
    following: 2,
    name: "Hamza Yusuf",
  },
];

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

const Dashboard = () => {
  return (
    <div className="w-[70%] mx-auto">
      <div className="flex flex-col items-center mb-20">
        <img src="/images/user.png" className="w-[100px] mb-6" />

        <h1 className="text-3xl font-bold font-rubik mb-4">
          {DUMMY_USERS[0].name}
        </h1>
        <div className="w-[300px] flex justify-evenly">
          <div className="flex flex-col items-center">
            <span className="">{DUMMY_USERS[0].following}</span>
            <p className="font-semibold text-slate-600">Following</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="">{DUMMY_USERS[0].following}</span>
            <p className="font-semibold text-slate-600">Following</p>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <span className="text-lg text-slate-800 font-semibold border-b-2 border-black">
          My Posts
        </span>
        <div className="flex flex-col items-center">
          {DUMMY_DATA.map((place) => {
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
      </div>
    </div>
  );
};

export default Dashboard;
