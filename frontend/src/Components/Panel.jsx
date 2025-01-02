import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Panel(props) {
  return (
    <div
      className={`bg-gradient-to-br ${props.begColor} ${props.midColor}  ${props.endColor} w-[300px] text-white rounded-2xl p-4`}
    >
      <div className="text-lg pl-2">{props.title}</div>
      <div className="flex justify-between pt-4">
        <FontAwesomeIcon icon={props.figure} className="text-[60px] pl-6" />
        <div className="">
          <div className="text-center font-bold text-3xl">${props.amount}</div>
          <div className="text-gray-200 text-center">{props.date}</div>
        </div>
      </div>
    </div>
  );
}
