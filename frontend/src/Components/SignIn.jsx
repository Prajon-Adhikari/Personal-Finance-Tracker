import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showInvalidUserMsg, setShowInvalidUserMsg] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8000/user/signin", {
        email,
        password,
      });
      console.log(data);
      toast.success(data.message);
      setShowInvalidUserMsg(false);
      navigate("/menu/dashboard");
      localStorage.setItem("token", data.token);
    } catch (error) {
      if (error.response) {
        setShowInvalidUserMsg(true);
        toast.error(error.response.data.message); // Access message from error response
      } else {
        toast.error("An unexpected error occurred"); // Handle unexpected errors
      }
    }
  };

  function handleShowPassword() {
    let password = document.getElementById("passwordField");
    if (showPassword) {
      setShowPassword(false);
      password.type = "password";
    } else {
      setShowPassword(true);
      password.type = "text";
    }
  }

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
              required
              value={email}
              className="border-2 text-xl py-1 px-4 w-[420px] border-gray-400 rounded-lg "
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="" className=" text-xl mb-1 ml-2 block">
              Password :
            </label>
            <div className="flex items-center gap-2">
              <input
                type="password"
                placeholder="Password"
                name="password"
                id="passwordField"
                required
                value={password}
                className="border-2 text-xl py-1 px-4 border-gray-400 rounded-lg w-[420px]"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="text-xl cursor-pointer text-gray-600"
                onClick={handleShowPassword}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </span>
            </div>
          </div>
          {showInvalidUserMsg ? (
            <div className="text-red-500 pl-3 text-md">
              * Invalid email or password
            </div>
          ) : (
            <div></div>
          )}
          <input
            type="submit"
            className="border-2 text-xl py-2 cursor-pointer px-4 mt-6 rounded-lg  bg-blue-400 w-[420px] text-white"
            value="Sign In"
          />
          <div className="text-center pt-2 ">
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
