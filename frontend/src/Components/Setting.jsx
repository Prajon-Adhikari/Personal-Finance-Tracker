import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Link, Outlet } from "react-router-dom";

export default function Setting() {
  return (
    <div className="h-screen flex flex-col">
      {/* Top Header */}
      <div className="bg-white flex justify-between items-center px-10 w-full h-[70px]">
        <h2 className="text-2xl font-bold">ACCOUNT SETTING</h2>
        <FontAwesomeIcon icon={faUser} />
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
              className="py-2 mr-4 rounded-3xl hover:bg-blue-300 px-4 hover:text-white"
            >
              My Profile
            </Link>
            <Link
              to="/menu/setting/security"
              className="py-2 mr-4 rounded-3xl hover:bg-blue-300 px-4 hover:text-white"
            >
              Security
            </Link>
            <Link
              to="/menu/setting/notifications"
              className="py-2 mr-4 rounded-3xl hover:bg-blue-300 px-4 hover:text-white"
            >
              Notifications
            </Link>
            <Link
              to="/menu/setting/dataexport"
              className="py-2 mr-4 rounded-3xl hover:bg-blue-300 px-4 hover:text-white"
            >
              Data Export
            </Link>
            <Link
              to="/menu/setting/deleteaccount"
              className="py-2 mr-4 text-red-500 rounded-3xl hover:bg-blue-300 px-4 hover:text-white"
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
