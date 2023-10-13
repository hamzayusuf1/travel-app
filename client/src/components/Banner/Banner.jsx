import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";

import { QUERY_USERS } from "../../utils/queries";

const Banner = () => {
  const { loading, data } = useQuery(QUERY_USERS);

  const handleGetUsers = () => {
    console.log(data);
  };

  // useEffect(() => {}, []);

  return (
    <div className="hidden md:flex justify-center items-center h-[150px] font-title mb-10">
      <h1
        onClick={() => {
          handleGetUsers();
        }}
        className="text-5xl text-black"
      >
        Welcome to NomadTravels
      </h1>
    </div>
  );
};

export default Banner;
