import { createBrowserRouter, Outlet } from "react-router-dom";
// import Landing from "../pages/Landing/Landing";
import Users from "../pages/Users";
import NewPlace from "../pages/NewPlace";
import NavLinks from "../components/Navlinks/NavLinks";
import { Landing, Home } from "../pages";

export const Nav = () => {
  return (
    <div>
      <button>
        <a href="">Home</a>
      </button>
      <button>
        <a href="">Pro</a>
      </button>
      <button>
        <a href="">Jects</a>
      </button>
    </div>
  );
};

export const Main = () => {
  return (
    <div>
      <NavLinks />
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
      },
      {
        path: "/home/posts",
        element: <Users />,
      },
    ],
  },
]);

export default router;
