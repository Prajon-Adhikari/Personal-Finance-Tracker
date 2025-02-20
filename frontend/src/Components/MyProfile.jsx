import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/menu/setting/myprofile",
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
          console.log(data.user);
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
    <div className="w-full">
      <div className="font-bold text-2xl ml-2">My Profile</div>
      <div className="flex border-2 shadow-[0px_0px_6px] shadow-slate-300 border-slate-300 rounded-lg justify-between py-4 px-8 my-6 mr-4 items-center">
        <div className="flex items-center gap-8">
          {user.profilePic ? (
            <>
              <img
                src={`http://localhost:8000/uploads/${user.profilePic}`}
                className="w-[120px] h-[120px] rounded-full object-cover"
              />
            </>
          ) : (
            <FontAwesomeIcon
              icon={faUser}
              className="border-2 text-[60px] px-7 py-6 rounded-full border-slate-300 bg-gray-300 text-gray-500"
            />
          )}
          <div>
            <div className="font-bold text-2xl">{user.fullName}</div>
            <div>{user.bio === undefined ? ` - ` : `${user.bio}`}</div>
            <div>{user.city === undefined ? ` - ` : `${user.city}`}</div>
          </div>
        </div>
        <div className="flex gap-2 items-center border-slate-300 text-xl border-2  px-6 py-2 rounded-full">
          <Link to="edit">
            <button className="pr-2">Edit</button>
            <FontAwesomeIcon icon={faPen} />
          </Link>
        </div>
      </div>
      <div className="border-2 shadow-[0px_0px_6px] shadow-slate-300 border-slate-300 rounded-lg px-10 py-6 mr-4">
        <div className="flex justify-between">
          <div className="font-semibold text-2xl">Personal Information</div>
          <button className="flex gap-2 items-center border-slate-300 text-xl border-2  px-4 py-1 rounded-full">
            <Link to="edit">
              <button className="pr-2">Edit</button>
              <FontAwesomeIcon icon={faPen} />
            </Link>
          </button>
        </div>
        <div className="mt-8 flex flex-col gap-10">
          <div>
            <div className="font-semibold text-lg">Full Name </div>
            <div>{user.fullName}</div>
          </div>
          <div className="flex gap-[160px]">
            <div>
              <div className="font-semibold text-lg">Email </div>
              <div>{user.email}</div>
            </div>
            <div>
              <div className="font-semibold text-lg">Mobile Number </div>
              <div>{user.mobile}</div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-lg">Bio </div>
            <div>{user.bio === undefined ? ` - ` : `${user.bio}`}</div>
          </div>
        </div>
      </div>
      <div className="border-2 shadow-[0px_0px_6px] shadow-slate-300 border-slate-300 rounded-lg px-10 py-6 mt-6 mr-4">
        <div className="flex justify-between">
          <div className="font-semibold text-2xl">Address Information</div>
          <button className="flex gap-2 items-center border-slate-300 text-xl border-2  px-4 py-1 rounded-full">
            <Link to="edit">
              <button className="pr-2">Edit</button>
              <FontAwesomeIcon icon={faPen} />
            </Link>
          </button>
        </div>
        <div className="mt-8 flex flex-col gap-10">
          <div className="flex gap-[160px]">
            <div>
              <div className="font-semibold text-lg">Country</div>
              <div>
                {user.country === undefined ? ` - ` : `${user.country}`}
              </div>
            </div>
            <div>
              <div className="font-semibold text-lg">City/State</div>
              <div>{user.city === undefined ? ` - ` : `${user.city}`}</div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-lg">Postal Code</div>
            <div>
              {user.postalCode === undefined ? ` - ` : `${user.postalCode}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
