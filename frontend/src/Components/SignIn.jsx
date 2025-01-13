import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8000/user/signin", {
        email,
        password,
      });
      toast.success(data.message);
      navigate("/menu/dashboard");
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
        className="px-[160px] pt-[150px] w-6/12"
        action="/user/signin"
        method="POST"
        onSubmit={handleSignIn}
      >
        <div className="text-[50px] font-bold text-blue-400">Sign In</div>
        <div>Enter your details</div>
        <div className="flex flex-col my-[40px] gap-4 ">
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
              name="password"
              value={password}
              className="border-2 text-xl py-1 px-4 border-gray-400 rounded-lg w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            className="border-2 text-xl py-2 cursor-pointer px-4 mt-8 rounded-lg  bg-blue-400 w-full text-white"
            value="Sign In"
          />
          <div className="text-center pt-2">
            Don't have an account ?{" "}
            <Link to="/user/signup" className="underline text-blue-700">
              Register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
