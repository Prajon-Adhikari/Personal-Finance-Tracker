import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Budget() {
  return (
    <>
      <div className="bg-white rounded-bl-xl flex justify-between items-center px-10 w-full h-[70px]">
        <h2 className="text-2xl  text-slate-600 font-bold">BUDGET PLANNING</h2>
        <FontAwesomeIcon
          className="bg-slate-200 text-gray-500 cursor-pointer px-[12px] py-[10px] mr-4 text-xl rounded-full "
          icon={faUser}
        />{" "}
      </div>
    </>
  );
}
