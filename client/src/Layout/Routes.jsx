import { createBrowserRouter, Outlet } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_ME, USER_PROFILE } from "../utils/queries";

import SideBar from "../components/SideBar/SideBar";
import Navbar from "../components/Navbar/Navbar";

import {
  Landing,
  Home,
  Users,
  Auth,
  UserPlaces,
  Recents,
  NewPlace,
  UpdatePlace,
  Dashboard,
} from "../pages";
import Banner from "../components/Banner/Banner";

export const Main = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full">
        <div className="sticky top-0 left-0 h-fit">
          <Navbar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

// const loaderParam = async ({ params }) => {
//   const { data } = await useQuery(USER_PROFILE, {
//     variables: { id: params.id },
//   });
// };

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing></Landing>,
  },
  {
    path: "/home",
    element: <Main></Main>,
    children: [
      {
        path: "/home",
        element: <Home></Home>,
        children: [
          {
            path: "/home/posts",
            element: <Users />,
          },
          {
            path: "/home/auth",
            element: <Auth />,
          },
          {
            path: "/home/:userId",
            element: <UserPlaces />,
          },
          {
            path: "/home/recents",
            element: <Recents />,
          },
          {
            path: "/home/add",
            element: <NewPlace />,
          },
          {
            path: "/home/dashboard/:id",
            element: <Dashboard />,
          },
          {
            path: "/home/edit/:placeId",
            element: <UpdatePlace />,
          },
        ],
      },
    ],
  },
]);

export default router;
