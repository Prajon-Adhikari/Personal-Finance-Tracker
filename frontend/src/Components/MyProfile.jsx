import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export default function MyProfile() {
  return (
    <div className="w-full">
      <div className="font-bold text-2xl ml-2">My Profile</div>
      <div className="flex border-2 shadow-[0px_0px_6px] shadow-slate-300 border-slate-300 rounded-lg justify-between py-4 px-8 my-6 mr-4 items-center">
        <div className="flex items-center gap-4">
          <FontAwesomeIcon
            icon={faUser}
            className="border-2 text-[60px] px-7 py-6 rounded-full border-slate-300 bg-gray-300 text-gray-500"
          />
          <div>
            <div className="font-bold text-2xl">Prajon Adhikari</div>
            <div>Team Manager</div>
            <div>Bharatpuur, Chitwan</div>
          </div>
        </div>
        <div className="flex gap-2 items-center border-slate-300 text-xl border-2  px-6 py-2 rounded-full">
          <div>Edit</div>
          <FontAwesomeIcon icon={faPen} />
        </div>
      </div>
      <div className="border-2 shadow-[0px_0px_6px] shadow-slate-300 border-slate-300 rounded-lg px-10 py-6 mr-4">
        <div className="flex justify-between">
          <div className="font-semibold text-2xl">Personal Information</div>
          <button className="flex gap-2 items-center border-slate-300 text-xl border-2  px-4 py-1 rounded-full">
            <button>Edit</button>
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
        <div className="mt-8 flex flex-col gap-10">
          <div>
            <div className="font-semibold text-lg">Full Name </div>
            <div>Prajon Adhikari</div>
          </div>
          <div className="flex gap-[160px]">
            <div>
              <div className="font-semibold text-lg">Email </div>
              <div>prajon@gmail.com</div>
            </div>
            <div>
              <div className="font-semibold text-lg">Mobile Number </div>
              <div>9876543210</div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-lg">Bio </div>
            <div>Team Manager</div>
          </div>
        </div>
      </div>
      <div className="border-2 shadow-[0px_0px_6px] shadow-slate-300 border-slate-300 rounded-lg px-10 py-6 mt-6 mr-4">
        <div className="flex justify-between">
          <div className="font-semibold text-2xl">Address Information</div>
          <button className="flex gap-2 items-center border-slate-300 text-xl border-2  px-4 py-1 rounded-full">
            <button>Edit</button>
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
        <div className="mt-8 flex flex-col gap-10">
          <div className="flex gap-[160px]">
            <div>
              <div className="font-semibold text-lg">Country</div>
              <div>Nepal</div>
            </div>
            <div>
              <div className="font-semibold text-lg">City/State</div>
              <div>Bharatpur, Chitwan</div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-lg">Postal Code</div>
            <div>98098</div>
          </div>
        </div>
      </div>
    </div>
  );
}
