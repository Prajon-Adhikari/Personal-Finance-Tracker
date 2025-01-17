import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "./MyContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddTransactions(props) {
  const [fileName, setFileName] = useState("No file selected");
  const [isExpense, setIsExpense] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [bill, setBill] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file?.name || "No file selected"); // Display file name
    setBill(file); // Update bill state with the file object
  };
  const { setShowAddTransactions } = useContext(MyContext);

  const navigate = useNavigate();

  const handleTransaction = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/menu/transactions",
        { title, transactionType, amount, category, bill, date },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      navigate(`/menu/transactions/${props.month}`);
      setShowAddTransactions(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

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
      <form
        action={`/menu/transactions/${props.month}`}
        onSubmit={handleTransaction}
        method="POST"
        className="flex flex-col w-full gap-5"
      >
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded py-1 px-4 text-xl border-2 border-gray-500"
        />
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded py-1 px-4 text-xl  border-2 border-gray-500"
          max={new Date().toISOString().split("T")[0]}
        />
        <div className="flex gap-10">
          <div>
            <input
              type="radio"
              id="income"
              name="transactionType"
              value="income" // Correct value
              onChange={(e) => {
                setTransactionType(e.target.value);
                setIsExpense("income");
              }}
              className="mr-2"
            />
            <label htmlFor="income">Income</label>
          </div>
          <div>
            <input
              type="radio"
              id="expenses"
              name="transactionType"
              value="expense" // Correct value
              onChange={(e) => {
                setTransactionType(e.target.value);
                setIsExpense("expense");
              }}
              className="mr-2"
            />
            <label htmlFor="expenses">Expenses</label>
          </div>
        </div>
        <input
          type="number"
          placeholder="Amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded py-1 px-4 text-xl  border-2 border-gray-500"
        />
        <select
          name="category"
          id=""
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className=" w-full rounded py-1 px-4 text-xl  border-2 border-gray-500"
        >
          <option value="">Select Category</option>
          {isExpense === "income" ? (
            <>
              <option value="Sales">Sales</option>
              <option value="Salary">Salary</option>
              <option value="Other Income">Other</option>
            </>
          ) : (
            ""
          )}
          {isExpense === "expense" ? (
            <>
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Electricity">Electricity</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Charity">Charity</option>
              <option value="Other Expense">Other</option>
            </>
          ) : (
            ""
          )}
        </select>
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
