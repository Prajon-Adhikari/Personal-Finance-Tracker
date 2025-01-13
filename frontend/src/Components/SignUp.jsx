import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [unConfirmedPassword, setUnConfirmedPassword] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    console.log("submitted");
    e.preventDefault();
    if (unConfirmedPassword !== password) {
      alert("Password did not match");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:8000/user/signup",
        { fullName, email, password, mobile },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      navigate("/user/signin");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex">
      <div className="w-6/12 h-[100vh] text-white text-[60px]  bg-blue-300 text-center flex items-center justify-center">
        Welcome to Personal Finance Tracker
      </div>
      <form
        className="px-[160px] pt-[34px] w-6/12"
        action="/user/signup"
        method="POST"
        onSubmit={handleSignup}
      >
        <div className="text-[50px] font-bold text-blue-400">Sign Up</div>
        <div>Enter your details</div>
        <div className="flex flex-col my-[40px] gap-4 ">
          <div>
            <label htmlFor="" className=" text-xl mb-1 ml-2 block">
              Full Name :
            </label>
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              value={fullName}
              className="border-2 text-xl py-1 px-4 border-gray-400 rounded-lg w-full"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="" className=" text-xl mb-1 ml-2 block">
              Mobile :
            </label>
            <input
              type="text"
              placeholder="Mobile"
              name="mobile"
              value={mobile}
              className="border-2 text-xl py-1 px-4 border-gray-400 rounded-lg w-full"
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="" className=" text-xl mb-1 ml-2 block">
              Email :
            </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              className="border-2 text-xl py-1 px-4 border-gray-400 rounded-lg w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="" className=" text-xl mb-1 ml-2 block">
              Password :
            </label>
            <input
              type="password"
              placeholder="Password"
              value={unConfirmedPassword}
              className="border-2 text-xl py-1 px-4 border-gray-400 rounded-lg w-full"
              onChange={(e) => setUnConfirmedPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="" className=" text-xl mb-1 ml-2 block">
              Confirm Password :
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="password"
              value={password}
              className="border-2 text-xl py-1 px-4 border-gray-400 rounded-lg w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            className="border-2 text-xl py-2 cursor-pointer px-4 mt-8 rounded-lg  bg-blue-400 w-full text-white"
            value="Sign Up"
          />
          <div className="text-center pt-2">
            Already have an account ?{" "}
            <Link to="/user/signin" className="underline text-blue-700">
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
