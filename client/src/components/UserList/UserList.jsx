import React from "react";

import UserItem from "../UserItem/UserIterm";

export const UserList = ({ users }) => {
  if (users.length === 0) {
    return (
      <div className="flex justify-center align-center">
        <h2>No users found</h2>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex justify-center align-center bg-gray-900 p-5">
      <ul>
        {users.map((user) => {
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
