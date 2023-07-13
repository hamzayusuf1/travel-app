import React from "react";
import { Link } from "react-router-dom";

import background from "../../assests/background.jpg";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="bg flex justify-center">
      <div className="overlay1">
        <div className="absolute top-10 flex min-w-[600px] justify-between">
          <div className="hidden md:flex">HamzaCodes</div>
          <div className="flex gap-16">
            <div>
              <a href="">Home</a>
            </div>
            <div>
              <a href="">Destinations</a>
            </div>
            <div>
              <a href="">Account</a>
            </div>
          </div>
        </div>
        <div className="absolute top-40">
          <h1 className="font-bold  text-5xl mb-4 text-center">
            Welcome to NomadNarnia
          </h1>
          <p className="text-center mb-4 ">
            Explore breathtaking trips as inspiration for your next destination
          </p>
          <div className="flex flex-col items-center justify-center">
            <Link to={"/home/recents"}>
              <button className="bg-greenText text-lg p-5 flex items-center rounded-xl">
                Start Exploring
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
