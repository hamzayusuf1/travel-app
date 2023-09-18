import React, { useState } from "react";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";

import { GET_ME, USER_PROFILE } from "../../utils/queries";
import { ADD_FOLLOWER } from "../../utils/mutations";

import PlaceItem from "../../components/PlaceItem/PlaceItem";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  // const { loading, data } = useQuery(GET_ME);

  // const userData = data?.user || {};

  // console.log(data?.user.places);

  const [addFollower, { error }] = useMutation(ADD_FOLLOWER);

  const handleFollow = () => {
    try {
      const { data } = addFollower({
        variables: {
          id: urlId.id,
        },
      });
    } catch (error) {}
  };

  const [userData, setUserData] = useState({});

  console.log(userData?.following);

  const urlId = useParams();

  const dummyId = "64f8754bb5ffd31757c22f3e";

  const USER = gql`
    query profile($id: ID!) {
      profile(id: $id) {
        _id
      }
    }
  `;
  const [profileQuery] = useLazyQuery(USER_PROFILE);

  const loadData = async () => {
    const { data } = await profileQuery({
      variables: {
        id: urlId.id,
      },
    });
    console.log(data);
    setUserData(data.profile);
  };

  useEffect(() => {
    loadData();
  }, []);

  // const loadProfile = async () => {
  //   const response = profileQuery({
  //     variables: {
  //       id: dummyId,
  //     },
  //   });
  //   console.log(response.data);
  //   return data;
  // };

  const data = 2;
  const loading = false;

  if (loading) {
    return <h2>Loading</h2>;
  }

  return (
    <div className="w-[70%] mx-auto">
      <div className="flex flex-col items-center mb-20">
        <div className=" flex flex-col items-center">
          <div className="flex w-full justify-end mb-4">
            <button
              onClick={handleFollow}
              className="font-bold flex items-center gap-2 inline-block rounded bg-[#637194] px-4 py-2  text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-sky-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600"
            >
              Follow <span className="text-xl">➕</span>
            </button>
          </div>

          <img src="/images/user.png" className="w-[100px] mb-6" />

          <h1 className="text-3xl font-bold font-rubik mb-4">
            {userData?.username}
          </h1>
          <div className="w-[300px] flex justify-evenly">
            <div className="flex flex-col items-center">
              <span className="">{userData?.following || 0}</span>
              <p className="font-semibold text-slate-600">Following</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="">{userData?.following || 0}</span>
              <p className="font-semibold text-slate-600">Following</p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <span className="text-lg text-slate-800 font-semibold border-b-2 border-black">
          My Posts
        </span>
        <h2 className="text-xl text-black font-bold">
          {" "}
          {userData?.places?.length
            ? `Viewing ${userData.places.length} ${
                userData.places.length === 1 ? "trip" : "trips"
              }:`
            : "You have no created trips!"}
        </h2>
        <div className="flex flex-col items-center">
          {userData?.places?.map((place) => {
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
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
