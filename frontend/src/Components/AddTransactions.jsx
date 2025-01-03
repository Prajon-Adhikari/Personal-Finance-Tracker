import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "./MyContext";

export default function AddTransactions() {
  const [fileName, setFileName] = useState("No file selected");

  const handleFileChange = (event) => {
    setFileName(event.target.files[0]?.name || "No file selected");
  };

  const { setShowAddTransactions } = useContext(MyContext);
  return (
    <div className="w-[500px] bg-white mb-10 px-10 pt-6 pb-10 shadow-sm rounded-xl">
      <div className="mb-8 flex justify-between items-center">
        <div className=" font-semibold text-2xl text-gray-700">
          {" "}
          Add Transactions
        </div>
        <button
          className="bg-gray-200 px-[10px] py-[4px] text-gray-700 cursor-pointer rounded-full"
          onClick={() => setShowAddTransactions(false)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <form action="" className="flex flex-col w-full gap-5">
        <input
          type="text"
          placeholder="Title"
          className="w-full rounded py-1 px-4 text-xl border-2 border-gray-500"
        />
        <input
          type="date"
          className="w-full rounded py-1 px-4 text-xl  border-2 border-gray-500"
          max={new Date().toISOString().split("T")[0]}
        />
        <div className="flex gap-10">
          <div>
            <input type="radio" id="income" name="type" className="mr-2" />
            <label htmlFor="income">Income</label>
          </div>
          <div>
            <input type="radio" id="expenses" name="type" className="mr-2" />
            <label htmlFor="expenses">Expenses</label>
          </div>
        </div>
        <input
          type="number"
          placeholder="Amount"
          className="w-full rounded py-1 px-4 text-xl  border-2 border-gray-500"
        />
        <input
          type="text"
          placeholder="Category"
          className="w-full rounded py-1 px-4 text-xl  border-2 border-gray-500"
        />
        <div class="relative w-full">
          <input
            type="file"
            id="fileUpload"
            class="hidden"
            onChange={handleFileChange}
          />
          <label
            for="fileUpload"
            class="cursor-pointer inline-block bg-blue-500 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-600 transition"
          >
            Upload Bill
          </label>
          <p className="mt-2 text-gray-600 text-sm">{fileName}</p>
        </div>
        <input
          type="submit"
          className="bg-green-400 mt-4 py-2 text-xl text-white rounded-lg"
        />
      </form>
    </div>
  );
}
