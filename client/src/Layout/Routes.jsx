import { createBrowserRouter, Outlet } from "react-router-dom";
// import Landing from "../pages/Landing/Landing";

import NewPlace from "../pages/NewPlace";
import NavLinks from "../components/Navlinks/NavLinks";
import { Landing, Home, Users, Auth, UserPlaces, Recents } from "../pages";
import Banner from "../components/Banner/Banner";

export const Main = () => {
  return (
    <div>
      {/* <Banner /> */}
      <Outlet />;
    </div>
  );
};

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
        ],
      },
    ],
  },
]);

export default router;
