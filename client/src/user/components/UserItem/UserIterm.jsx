import React from "react";
import { Link } from "react-router-dom";
import Displaypicture from "../DisplayPicture/Displaypicture";

const UserIterm = ({ id, name, image, placeCount }) => {
  return (
    <li className="p-6 max-w-sm bg-white hover:bg-gray-100 rounded-lg border border-gray-200 shadow-md mb-5">
      <div className="userCard">
        <Link
          onClick={console.log(`${id} + ${name} + ${image}`)}
          to={`/${id}/places`}
        >
          <div className="picture">
            {/* <img src={image} /> */}
            <Displaypicture image={image} alt={name} />
          </div>
          <div>
            <h2 className="text-3xl">Hi, {name}</h2>
            <h3>
              {placeCount} {placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </div>
    </li>
  );
};

export default UserIterm;
