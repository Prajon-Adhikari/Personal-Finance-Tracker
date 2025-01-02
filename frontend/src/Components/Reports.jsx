import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

export default function Reports() {
  return (
    <>
      <div className="bg-white flex justify-between items-center px-10 w-full h-[70px]">
        <h2 className="text-2xl font-bold">REPORTS</h2>
        <FontAwesomeIcon icon={faUser} />
      </div>
    </>
  );
}
