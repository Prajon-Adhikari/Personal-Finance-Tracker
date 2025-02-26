import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Setting() {
  const location = useLocation();
  return (
    <div className="h-screen flex flex-col">
      {/* Top Header */}
      <div className="bg-white rounded-bl-xl flex justify-between items-center px-10 w-full h-[70px]">
        <h2 className="text-2xl  text-slate-600 font-bold">ACCOUNT SETTING</h2>
        <FontAwesomeIcon
          className="bg-slate-200 text-gray-500 cursor-pointer px-[12px] py-[10px] mr-4 text-xl rounded-full "
          icon={faUser}
        />{" "}
      </div>

      {/* Add Gap */}
      <div className="h-2 bg-gray-100"></div>

      {/* Main Content Area */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className=" w-[200px] font-semibold bg-white sticky top-[79px] h-[calc(100vh-79px)] rounded-tl-xl">
          <div className="flex flex-col gap-4 mt-10 h-[600px] ml-5 border-r-2">
            <Link
              to="/menu/setting/myprofile"
              className={`py-2 mr-4 rounded-3xl px-4 hover:text-blue-400 ${
                location.pathname === "/menu/setting/myprofile"
                  ? "active-setting"
                  : ""
              }`}
            >
              My Profile
            </Link>
            <Link
              to="/menu/setting/security"
              className={`py-2 mr-4 rounded-3xl px-4 hover:text-blue-400 ${
                location.pathname === "/menu/setting/security"
                  ? "active-setting"
                  : ""
              }`}
            >
              Security
            </Link>
            <Link
              to="/menu/setting/notifications"
              className={`py-2 mr-4 rounded-3xl px-4 hover:text-blue-400 ${
                location.pathname === "/menu/setting/notifications"
                  ? "active-setting"
                  : ""
              }`}
            >
              Notifications
            </Link>
            <Link
              to="/menu/setting/dataexport"
              className={`py-2 mr-4 rounded-3xl px-4 hover:text-blue-400 ${
                location.pathname === "/menu/setting/dataexport"
                  ? "active-setting"
                  : ""
              }`}
            >
              Data Export
            </Link>
            <Link
              to="/menu/setting/deleteaccount"
              className={`py-2 mr-4 rounded-3xl px-4 text-red-500 hover:text-blue-400 ${
                location.pathname === "/menu/setting/deleteaccount"
                  ? "active-setting"
                  : ""
              }`}
            >
              Delete Account
            </Link>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto mt-[1px] max-h-[calc(100vh-80px)] px-10 py-10 bg-white rounded-tr-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
