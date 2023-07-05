import React from "react";
import { Outlet } from "react-router-dom";

import UserItem from "../../components/UserItem/UserIterm";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Jane Doe",
      image: "https://picsum.photos/200/300",
      places: 1,
    },
    {
      id: "u2",
      name: "John Doe",
      image: "https://picsum.photos/200/300",
      places: 10,
    },
  ];

  if (USERS.length === 0) {
    return (
      <div className="flex justify-center align-center">
        <h2>No users found</h2>
      </div>
    );
  }
  return (
    <div className="w-full h-screen justify-center align-center bg-lightBlue p-5">
      <ul
        className="flex flex-col
       items-center"
      >
        {USERS.map((user) => {
          return (
            <UserItem
              key={user.id}
              id={user.id}
              placeCount={user.places}
              name={user.name}
              image={user.image}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
