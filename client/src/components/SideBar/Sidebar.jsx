import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "../../App";
import Img from "../../assests/NomadLogo.png";
import { Outlet, Link } from "react-router-dom";
import Auth from "../../utils/Auth";

const SideBar = () => {
  //Use Global context
  const { width, setWidth } = useContext(AppContext);

  const [open, setOpen] = useState(true);
  console.log(open);
  console.log(width);
  const Menus = [1, 2, 3];

  const { user, setUser } = useContext(AppContext);
  console.log(user);

  //retrive the uuid, job and name from localstorage to access dashboard
  const uuid = localStorage.getItem("uuid");
  console.log(uuid);
  const job = localStorage.getItem("job");
  const username = localStorage.getItem("username");

  //Create isMobile condition
  const isMobile = width <= 800;

  useEffect(() => {
    setOpen(false);
  }, [width]);

  return (
    <>
      {/* Main sidebar div */}
      <div
        className={`${
          open ? "w-72 sticky top-0 left-0" : "w-20 "
        } bg-white h-screen px-5  pt-8 pb-4 relative duration-300 border-r-2 border-gray-100 flex flex-col justify-between sticky top-0 left-0`}
      >
        {/* Back icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-arrow-left"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          className={`${
            !isMobile
              ? `absolute cursor-pointer -right-4 top-9 bg-white border-gray-900
          border-2 rounded-full  ${!open && "rotate-180"}`
              : "hidden"
          }`}
          onClick={() => setOpen(!open)}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l14 0" />
          <path d="M5 12l6 6" />
          <path d="M5 12l6 -6" />
        </svg>

        {/* Top portion of sidebar */}
        <div className="flex flex-col justify-between">
          <div className="flex items-center gap-x-3.5 py-2 px-2.5 text-md text-black rounded-md hover:bg-gray-100 dark:bg-gray-900 dark:text-white mb-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-category"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#000000"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 4h6v6h-6z" />
              <path d="M14 4h6v6h-6z" />
              <path d="M4 14h6v6h-6z" />
              <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            </svg>
            <h1
              className={`text-black origin-left font-medium text-2xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Menu
            </h1>
          </div>
          <nav
            className="hs-accordion-group w-full flex flex-col flex-wrap"
            data-hs-accordion-always-open
          >
            <ul class="space-y-3">
              {/* Home */}
              <li>
                <a
                  className={`flex items-center gap-x-3.5 py-2 px-2.5 text-md text-black rounded-md  dark:bg-gray-900 dark:text-white `}
                  href={"/home/recents"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler"
                    width="30"
                    height="30"
                    fill="#808080"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                    />
                  </svg>
                  <h3 className={`${!open && "scale-0"}`}>Home</h3>
                </a>
              </li>

              {/* Users */}
              <li>
                <a
                  className={`flex items-center gap-x-3.5 py-2 px-2.5 text-md text-black rounded-md  dark:bg-gray-900 dark:text-white `}
                  href="javascript:;"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler"
                    width="30"
                    height="30"
                    fill="#808080"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
                  </svg>
                  <h3 className={`${!open && "scale-0"}`}>Users</h3>
                </a>
              </li>

              {/* Account */}
              <li>
                <Link
                  className={`flex items-center gap-x-3.5 py-2 px-2.5 text-md text-black rounded-md dark:bg-gray-900 dark:text-white `}
                  href="javascript:;"
                  to={`/home/dashboard/${uuid}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler"
                    width="26"
                    height="26"
                    fill="#808080"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path
                      fill-rule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                    />
                  </svg>
                  <h3 className={`${!open && "scale-0"}`}>Account</h3>
                </Link>
              </li>

              {/* Create */}
              {Auth.loggedIn(localStorage.getItem("id_token")) && (
                <li>
                  <a
                    className={`flex items-center gap-x-3.5 py-2 px-2.5 text-md text-black rounded-md  dark:bg-gray-900 dark:text-white `}
                    href={"/home/add"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler"
                      width="30"
                      height="30"
                      stroke-width="1.5"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1H1.5z"></path>
                      <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2h-11zM3 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V9h-4.5A1.5 1.5 0 0 0 9 10.5V15H3.5a.5.5 0 0 1-.5-.5v-11zm7 11.293V10.5a.5.5 0 0 1 .5-.5h4.293L10 14.793z"></path>
                    </svg>
                    <h3 className={`${!open && "scale-0"}`}>Share Trip</h3>
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>

        {/* logout button */}
        <div className="hs-accordion-group w-full flex flex-col flex-wrap space-y-3 dark">
          <div className="w-full border-y-[1px] border-gray-200 shadow-sm py-4">
            <div className="justify-start items-center flex relative">
              <img
                src="/images/user.png"
                className="object-cover btn- h-10 rounded-full mr-2 bg-gray-300"
                alt=""
              />
              <div>
                <p className={`font-semibold text-md ${!open && "scale-0"}`}>
                  {username ? username : ""}
                </p>
                <p className={`text-sm ${!open && "scale-0"}`}>{job}</p>
              </div>
            </div>
          </div>
          {!Auth.loggedIn(localStorage.getItem("id_token")) ? (
            <Link
              key={"Login"}
              to={`/home/auth`}
              className="flex items-center gap-x-3.5 py-1 px-1 text-md text-black rounded-xl bg-gray-200 hover:bg-gray-100 tansition-all duration-75"
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
              <h3 className={`${!open && "scale-0 hidden"}`}>Login</h3>
            </Link>
          ) : (
            <Link
              key={"Logout"}
              onClick={() => {
                Auth.logout();
              }}
              className="flex items-center gap-x-3.5 py-1 px-2.5 text-md text-black rounded-lg dark:bg-gray-900 dark:text-white hover:bg-gray-700"
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
              <h3 className={`${!open && "scale-0"}`}>Logout</h3>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default SideBar;
