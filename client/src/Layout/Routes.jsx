import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import Users from "../pages/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing></Landing>,
    children: [
      {
        path: "/home",
        element: <Users></Users>,
      },
    ],
  },
]);

export default router;
