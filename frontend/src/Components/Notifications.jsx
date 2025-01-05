import React, { useState } from "react";

export default function Notifications() {
  const [popupMessage, setPopupMessage] = useState(false);
  const [updateMessage, setUpdateMessage] = useState(false);
  const [reportMessage, setReportMessage] = useState(false);
  const [budgetMessage, setBudgetMessage] = useState(false);

  return (
    <div>
      <div className="border-b-2 pb-4">
        <div className="font-bold text-2xl">Notificaiton Setting</div>
        <div className=" text-slate-500 pt-1">
          In addition to alerts, when necessary, we may send you message
        </div>
      </div>
      <div className="mt-8">
        <div className="flex justify-between mr-[200px] items-center px-2 py-4">
          <div className="text-lg text-slate-800">
            Pop up notifications on desktop
          </div>
          <div>
            {" "}
            <button
              className={`w-[40px] p-[2px] h-[22px] rounded-2xl flex ${
                popupMessage ? "activeEnableBtn" : "deactiveEnableBtn"
              }`}
              onClick={() => setPopupMessage(!popupMessage)}
            >
              <div className={`w-[17px] h-full rounded-full bg-white `}>
                &emsp;
              </div>
            </button>
          </div>
        </div>
        <div className="flex justify-between mr-[200px] items-center px-2 py-4">
          <div className="text-lg text-slate-800">
            Turn on new update notifications
          </div>
          <div>
            {" "}
            <button
              className={`w-[40px] p-[2px] h-[22px] rounded-2xl flex ${
                updateMessage ? "activeEnableBtn" : "deactiveEnableBtn"
              }`}
              onClick={() => setUpdateMessage(!updateMessage)}
            >
              <div className={`w-[17px] h-full rounded-full bg-white `}>
                &emsp;
              </div>
            </button>
          </div>
        </div>
        <div className="flex justify-between mr-[200px] items-center px-2 py-4">
          <div className="text-lg text-slate-800">
            Turn on weekly report notifications
          </div>
          <div>
            {" "}
            <button
              className={`w-[40px] p-[2px] h-[22px] rounded-2xl flex ${
                reportMessage ? "activeEnableBtn" : "deactiveEnableBtn"
              }`}
              onClick={() => setReportMessage(!reportMessage)}
            >
              <div className={`w-[17px] h-full rounded-full bg-white `}>
                &emsp;
              </div>
            </button>
          </div>
        </div>
        <div className="flex justify-between mr-[200px] items-center px-2 py-4">
          <div className="text-lg text-slate-800">
            Turn on budget overruns notifications
          </div>
          <div>
            {" "}
            <button
              className={`w-[40px] p-[2px] h-[22px] rounded-2xl flex ${
                budgetMessage ? "activeEnableBtn" : "deactiveEnableBtn"
              }`}
              onClick={() => setBudgetMessage(!budgetMessage)}
            >
              <div className={`w-[17px] h-full rounded-full bg-white `}>
                &emsp;
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
