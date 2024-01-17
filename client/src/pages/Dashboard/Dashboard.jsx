import React, { useState } from "react";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CLoadingButton } from "@coreui/react-pro";
import jwtDecode from "jwt-decode";

import { GET_ME, USER_PROFILE } from "../../utils/queries";
import { ADD_FOLLOWER } from "../../utils/mutations";

import PlaceItem from "../../components/PlaceItem/PlaceItem";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  // const { loading, data } = useQuery(GET_ME);

  // const userData = data?.user || {};

  // console.log(data?.user.places);

  const [followed, setFollowed] = useState(false);

  const [state, setState] = useState(false);

  const [addFollower, { error, loading2 }] = useMutation(ADD_FOLLOWER);
  const [profileQuery] = useLazyQuery(USER_PROFILE);

  const handleFollow = async () => {
    try {
      const { data } = await addFollower({
        variables: {
          id: urlId.id,
        },
      });
      console.log(data);
    } catch (error) {}
  };

  const [userData, setUserData] = useState({});

  const urlId = useParams();

  const dummyId = "64f8754bb5ffd31757c22f3e";

  const USER = gql`
    query profile($id: ID!) {
      profile(id: $id) {
        _id
      }
    }
  `;

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
            {/* <CLoadingButton
              onClick={() => {
                setState(!state);
              }}
              loading={state}
              className=""
            >
              Follow <span className="text-xl">➕</span>
            </CLoadingButton> */}
          </div>

          <img src="/images/user.png" className="w-[100px] mb-6" />

          <h1 className="text-3xl font-bold font-rubik mb-4">
            {userData?.username}
          </h1>
          <div className="w-[300px] flex justify-evenly">
            <div className="flex flex-col items-center">
              <span className="">{userData?.following?.length || 0}</span>
              <p className="font-semibold text-slate-600">Following</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="">{userData?.followers?.length || 0}</span>
              <p className="font-semibold text-slate-600">Followers</p>
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
            ? `Viewing ${userData?.places.length} ${
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
