import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";

import { QUERY_USERS } from "../../utils/queries";

const Banner = () => {
  const { loading, data } = useQuery(QUERY_USERS);

  // useEffect(() => {}, []);

  return (
    <div className="hidden md:flex justify-center items-center h-[150px] font-title mb-10">
      <h1 className="text-2xl text-black">
        Like To Share Your Recent Adventure?{" "}
      </h1>
    </div>
  );
};

export default Banner;
