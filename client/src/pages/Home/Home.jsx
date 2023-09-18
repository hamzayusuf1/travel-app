import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Banner from "../../components/Banner/Banner";
import PlaceItem from "../../components/PlaceItem/PlaceItem";
import Auth from "../../utils/Auth";
import { GET_ME } from "../../utils/queries";

const menuLinks = [
  {
    name: "Home",
    link: `/home/recents/`,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-home"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    ),
  },

  {
    name: "Posts",
    link: "/home/posts",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-clipboard"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        stroke-width="2.5"
        stroke="#2c3e50"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
        <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
      </svg>
    ),
  },
  // {
  //   name: "Login",
  //   link: "/home/auth",
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       class="icon icon-tabler icon-tabler-login"
  //       width="44"
  //       height="44"
  //       viewBox="0 0 24 24"
  //       stroke-width="1.5"
  //       stroke="#2c3e50"
  //       fill="none"
  //       stroke-linecap="round"
  //       stroke-linejoin="round"
  //     >
  //       <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  //       <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
  //       <path d="M20 12h-13l3 -3m0 6l-3 -3" />
  //     </svg>
  //   ),
  // },
];

const Home = () => {
  //Get user data for post
  const { loading, data } = useQuery(GET_ME);

  console.log(data);

  const userData = data?.user || {};

  return (
    <div className="w-full h-full bg-lightBlue bg-lightBlue md:flex">
      {/* Sidebar */}
      <div className="h-[60px] md:h-screen md:block shadow-[rgba(0,15,15,0)_10px_5px_4px_0px] px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out">
        {" "}
        <div
          id="menu"
          className="flex flex-row md:flex-col space-x-6 md:space-x-0 md:space-y-2 justify-center h-full"
        >
          {menuLinks.map((nav) => (
            <Link
              key={nav.name}
              to={`${nav.link}`}
              className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-black hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out text-black flex items-center space-x-2"
            >
              <div>{nav.icon}</div>
              <span className="text-lg hidden md:block">{nav.name}</span>
            </Link>
          ))}

          {Auth.loggedIn(localStorage.getItem("id_token")) && (
            <Link
              key={"Dashboard"}
              to={`/home/dashboard/${data?.user?._id}`}
              className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-black hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out text-black flex items-center space-x-2"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-layout-dashboard"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  stroke="#2c3e50"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 4h6v8h-6z" />
                  <path d="M4 16h6v4h-6z" />
                  <path d="M14 12h6v8h-6z" />
                  <path d="M14 4h6v4h-6z" />
                </svg>
              </div>
              <span className="text-lg hidden md:block">Dashboard</span>
            </Link>
          )}

          {Auth.loggedIn(localStorage.getItem("id_token")) && (
            <Link
              key={"Create"}
              to={`/home/add`}
              className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-black hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out text-black flex items-center space-x-2"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-square-plus"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  stroke="#2c3e50"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                  <path d="M9 12l6 0" />
                  <path d="M12 9l0 6" />
                </svg>
              </div>
              <span className="text-lg hidden md:block">Create</span>
            </Link>
          )}

          {!Auth.loggedIn(localStorage.getItem("id_token")) ? (
            <Link
              key={"Login"}
              to={`/home/auth`}
              className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-black hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out text-black flex items-center space-x-2"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-login"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                  <path d="M20 12h-13l3 -3m0 6l-3 -3" />
                </svg>
              </div>
              <span className="text-lg hidden md:block">Login</span>
            </Link>
          ) : (
            <Link
              key={"Logout"}
              onClick={() => {
                Auth.logout();
              }}
              className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-black hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out text-black flex items-center space-x-2"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-logout"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  stroke="#2c3e50"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                  <path d="M9 12h12l-3 -3" />
                  <path d="M18 15l3 -3" />
                </svg>
              </div>
              <span className="text-lg hidden md:block">Logout</span>
            </Link>
          )}
        </div>
      </div>
      {/* Main div */}
      <div className="h-fit w-full">
        <Banner></Banner>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Home;
