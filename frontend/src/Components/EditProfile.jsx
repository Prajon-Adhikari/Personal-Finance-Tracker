import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function EditProfile() {
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const fetchUserData = async () => {
    const response = await fetch(
      "http://localhost:8000/menu/setting/myprofile/edit"
    );
    const data = await response.json();

    console.log(data.user);
  };
  return (
    <div>
      <div className="bg-white rounded-bl-xl flex justify-between items-center px-10 w-full h-[70px]">
        <h2 className="text-2xl font-bold">ACCOUNT SETTING</h2>
        <FontAwesomeIcon
          className="bg-slate-200 text-gray-500 cursor-pointer px-[12px] py-[10px] mr-4 text-xl rounded-full "
          icon={faUser}
        />{" "}
      </div>
      <div className="bg-white rounded-xl mt-6 min-h-[100vh] ">
        <div className="text-gray-800 text-3xl py-6 border-slate-300 border-b-2 mx-[100px] text-center ">
          Edit Your Profile
        </div>
        <button onClick={fetchUserData}>Fetch</button>
        <div className="text-center mt-12">
          <FontAwesomeIcon
            className="bg-slate-200 text-gray-500 cursor-pointer px-[60px] py-[51px] mb-10 text-[120px] rounded-full "
            icon={faUser}
          />{" "}
        </div>
        <div className="mx-[180px] text-3xl text-customBlue1 mt-10">
          Update your Personal Information
        </div>
        <div className="my-10 mx-[180px] flex flex-col gap-8">
          <div className="flex gap-[200px]">
            <div className="flex flex-col gap-1">
              <label className="px-[2px] text-xl " htmlFor="fullName">
                Full Name :
              </label>
              <input
                className="border-2 w-[320px] text-xl outline-slate-500 border-slate-300 rounded-md px-4 py-[3px]"
                type="text"
                placeholder="FullName"
                id="fullName"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="px-[2px] text-xl" htmlFor="post">
                Post :
              </label>
              <input
                type="text"
                className="border-2 w-[320px] text-xl outline-slate-500 border-slate-300 rounded-md px-4 py-[3px]"
                placeholder="Post"
                id="post"
              />
            </div>
          </div>
          <div className="flex gap-[200px]">
            <div className="flex flex-col gap-1">
              <label className="px-[2px] text-xl" htmlFor="email">
                Email :
              </label>
              <input
                type="email"
                className="border-2 text-xl w-[320px] outline-slate-500 border-slate-300 rounded-md px-4 py-[3px]"
                placeholder="Email"
                id="email"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="px-[2px] text-xl" htmlFor="mobile">
                Mobile Number :
              </label>
              <input
                type="text"
                placeholder="Mobile"
                className="border-2 w-[320px] text-xl outline-slate-500 border-slate-300 rounded-md px-4 py-[3px]"
                id="mobile"
              />
            </div>
          </div>
        </div>
        <div className="mx-[180px] text-3xl text-customBlue1 mt-10">
          Update your Address
        </div>
        <div className="my-10 mx-[180px] flex flex-col gap-8">
          <div className="flex gap-[200px]">
            <div className="flex flex-col gap-1">
              <label className="px-[2px] text-xl " htmlFor="country">
                Country :
              </label>
              <input
                className="border-2 w-[320px] text-xl outline-slate-500 border-slate-300 rounded-md px-4 py-[3px]"
                type="text"
                placeholder="Country"
                id="country"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="px-[2px] text-xl" htmlFor="city">
                City/State :
              </label>
              <input
                type="text"
                className="border-2 w-[320px] text-xl outline-slate-500 border-slate-300 rounded-md px-4 py-[3px]"
                placeholder="City/State"
                id="city"
              />
            </div>
          </div>
          <div className="flex gap-[200px]">
            <div className="flex flex-col gap-1">
              <label className="px-[2px] text-xl" htmlFor="postalCode">
                Postal Code :
              </label>
              <input
                type="text"
                className="border-2 text-xl w-[320px] outline-slate-500 border-slate-300 rounded-md px-4 py-[3px]"
                placeholder="Postal Code"
                id="postalCode"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
