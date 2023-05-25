import React from "react";

import { UserList } from "../components/UserList/UserList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Hamza yusuf",
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
  return <UserList users={USERS} />;
};

export default Users;
