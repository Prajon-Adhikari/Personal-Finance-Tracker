import React from "react";

export default function SignUp() {
  return (
    <div className="flex">
      <div className="w-6/12 h-[100vh] text-white text-[60px]  bg-blue-300 text-center flex items-center justify-center">
        Welcome to Personal Finance Tracker
      </div>
      <div className="px-[160px] pt-[40px] w-6/12">
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
              className="border-2 text-xl py-1 px-4 border-gray-400 rounded-lg w-full"
            />
          </div>
          <div>
            <label htmlFor="" className=" text-xl mb-1 ml-2 block">
              Mobile :
            </label>
            <input
              type="text"
              placeholder="Mobile"
              className="border-2 text-xl py-1 px-4 border-gray-400 rounded-lg w-full"
            />
          </div>
          <div>
            <label htmlFor="" className=" text-xl mb-1 ml-2 block">
              Email :
            </label>
            <input
              type="email"
              placeholder="Email"
              className="border-2 text-xl py-1 px-4 border-gray-400 rounded-lg w-full"
            />
          </div>
          <div>
            <label htmlFor="" className=" text-xl mb-1 ml-2 block">
              Password :
            </label>
            <input
              type="password"
              placeholder="Password"
              className="border-2 text-xl py-1 px-4 border-gray-400 rounded-lg w-full"
            />
          </div>
          <div>
            <label htmlFor="" className=" text-xl mb-1 ml-2 block">
              Confirm Password :
            </label>

            <input
              type="password"
              placeholder="Confirm Password"
              className="border-2 text-xl py-1 px-4 border-gray-400 rounded-lg w-full"
            />
          </div>
          <input
            type="submit"
            className="border-2 text-xl py-2 px-4 mt-10 rounded-lg  bg-blue-400 w-full text-white"
            value="Sign Up"
          />
        </div>
      </div>
    </div>
  );
}
