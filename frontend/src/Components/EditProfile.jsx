import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function EditProfile() {
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/menu/setting/myprofile/edit",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setFullName(data.user.fullName || "");
          setBio(data.user.bio || "");
          setEmail(data.user.email || "");
          setMobile(data.user.mobile || "");
          setCountry(data.user.country || "");
          setCity(data.user.city || "");
          setPostalCode(data.user.postalCode || "");
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [token]);

  if (!user) {
    return <div>Loading...</div>;
  }

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
        <div className="text-gray-800 border-slate-300 border-b-2 text-3xl py-6  mx-[100px] text-center ">
          Edit Your Profile
        </div>
        <div className="flex justify-between mx-[120px] mt-6 ">
          <Link to="/menu/setting/myprofile">
            <button className="bg-black text-white py-2 px-6 rounded-lg text-xl">
              Back
            </button>
          </Link>
          <button className="bg-customTeal3 text-white rounded-lg px-6 py-2 text-xl">
            Save Changes
          </button>
        </div>
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
                value={fullName}
                name="fullName"
                placeholder="FullName"
                id="fullName"
                autoComplete="true"
                onChange={(e) => setFullName(e.target.value)}
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
                value={bio}
                name="bio"
                id="post"
                autoComplete="true"
                onChange={(e) => setBio(e.target.value)}
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
                value={email}
                name="email"
                autoComplete="true"
                onChange={(e) => setEmail(e.target.value)}
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
                value={mobile}
                name="mobile"
                autoComplete="true"
                onChange={(e) => setMobile(e.target.value)}
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
                value={country}
                name="country"
                id="country"
                autoComplete="true"
                onChange={(e) => setCountry(e.target.value)}
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
                value={city}
                name="city"
                autoComplete="true"
                onChange={(e) => setCity(e.target.value)}
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
                value={postalCode}
                name="postalCode"
                autoComplete="true"
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
