import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Menu() {
  const location = useLocation();

  const isActive = (basePath) => location.pathname.startsWith(basePath);

  return (
    <div className="flex gap-6 bg-gray-100">
      <div className="h-screen rounded-tl-2xl bg-white w-[270px] fixed">
        <h2 className="text-4xl text-center py-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white">
          TRACKER
        </h2>
        <div className="text-slate-600 text-2xl flex flex-col items-center mt-[80px] gap-8">
          <Link
            to="/menu/dashboard"
            className={`w-full pl-10 py-1 menu-elements ${
              isActive("/menu/dashboard") ? "active-element" : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/menu/transactions"
            className={`w-full pl-10 py-1 menu-elements ${
              isActive("/menu/transactions") ? "active-element" : ""
            }`}
          >
            Transactions
          </Link>
          <Link
            to="/menu/budget"
            className={`w-full pl-10 py-1 menu-elements ${
              isActive("/menu/budget") ? "active-element" : ""
            }`}
          >
            Budget Planning
          </Link>
          <Link
            to="/menu/reports"
            className={`w-full pl-10 py-1 menu-elements ${
              isActive("/menu/reports") ? "active-element" : ""
            }`}
          >
            Reports
          </Link>
          <Link
            to="/menu/setting"
            className={`w-full pl-10 py-1 menu-elements ${
              isActive("/menu/setting") ? "active-element" : ""
            }`}
          >
            Setting
          </Link>
        </div>
      </div>
      <div className="ml-[290px] flex-1 h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
