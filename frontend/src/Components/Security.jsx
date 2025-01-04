import React from "react";

export default function Security() {
  return (
    <div>
      <div className="border-b-2 pb-6 ml-2">
        <div className="text-2xl font-bold ">Security & Privacy</div>
        <div className="text-gray-400 pt-1">
          Manage Security & Privacy setting to protect your account
        </div>
      </div>
      <div className="flex gap-6 w-full">
        <div>
          <div className="border-2 my-4 rounded-lg px-6 py-4 shadow-[0px_0px_6px] shadow-slate-300">
            <div className="font-bold text-xl pb-4 border-b-2">
              Account Details
            </div>
            <div className="flex justify-between border-b-2 py-4 items-center">
              <div>
                <div className="text-lg font-semibold">
                  Verify Email Address
                </div>
                <div className="text-gray-400">
                  Verify your email address to confirm the credentials
                </div>
              </div>
              <div>
                <button className="bg-emerald-100 text-green-800 font-semibold px-[52px]  py-1 mr-4">
                  {" "}
                  Verified
                </button>
              </div>
            </div>
            <div className="flex justify-between py-4 items-center">
              <div>
                <div className="text-lg font-semibold">Update Password</div>
                <div className="text-gray-400">
                  Change your password to update and protect your account
                </div>
              </div>
              <div>
                <button className="mr-4 border-2 px-4 py-1 border-slate-300 rounded-lg font-semibold bg-gray-100">
                  Change Password
                </button>
              </div>
            </div>
          </div>
          <div className="border-2 my-4 rounded-lg px-6 py-4 shadow-[0px_0px_6px] shadow-slate-300">
            <div className="font-bold text-xl pb-4 border-b-2">
              Recovery Settings
            </div>
            <div className=" border-b-2 py-4 ">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-semibold">
                    Recovery Email Address
                  </div>
                  <div className="text-gray-400">
                    SetUp Recovery Email to Secure Your Account
                  </div>
                </div>
                <div>
                  <button className=" bg-black text-white  rounded-lg font-semibold  px-5  py-1 mr-4">
                    {" "}
                    Save
                  </button>
                </div>
              </div>
              <div>
                <input
                  type="email"
                  placeholder="recoveryemail@gmail.com"
                  className="border-2 border-slate-500 mt-4 mb-2 py-1 px-5 w-[400px] rounded-lg"
                />
              </div>
            </div>
            <div className=" border-b-2 py-4 ">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-semibold">
                    Recovery Phone Number
                  </div>
                  <div className="text-gray-400">
                    Add Phone Number to SetUp SMS Revcovery for your account
                  </div>
                </div>
                <div>
                  <button className=" bg-black text-white  rounded-lg font-semibold  px-5  py-1 mr-4">
                    {" "}
                    Save
                  </button>
                </div>
              </div>
              <div>
                <input
                  type="email"
                  placeholder="+977"
                  className="border-2 border-slate-500 mt-4 mb-2 py-1 px-5 w-[400px] rounded-lg"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between py-4 items-center border-2 px-4 rounded-xl shadow-[0px_0px_6px] shadow-slate-300">
            <div>
              <div className="text-lg font-semibold">Deactivate Account</div>
              <div className="text-gray-400">
                This will shut down your account, And it will reactivate with
                Signing in
              </div>
            </div>
            <div>
              <button className="mr-4 border-2 px-4 py-1 border-slate-300 rounded-lg font-semibold bg-gray-100">
                Deactivate
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="border-2 w-[300px] my-4 p-4 rounded-xl shadow-[0px_0px_6px] shadow-slate-300">
            <div className="font-bold text-xl pb-4 border-b-2">
              Two Factor Authentication
            </div>
            <div className="py-4  border-b-2">
              <div className="flex justify-between items-center">
                <div className="font-semibold text-lg">
                  Enable Authentication
                </div>
                <div>
                  <button>button</button>
                </div>
              </div>
              <div className="text-slate-400 pt-1">
                Enable Two Factor Authentication to enhance the security
              </div>
            </div>
            <div className="py-4  border-b-2">
              <div>Authentication App</div>
            </div>
            <div className="py-4">
              <div className="font-semibold">Security Key</div>
              <div className="text-slate-400 pt-1">
                Use physical security key to protexct your account
              </div>
              <div>
                <button className="border-2 w-full mt-4 py-1  rounded-xl bg-gray-100 border-slate-300 font-semibold">
                  {" "}
                  Use Security Key
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
