import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import {
  faUtensils,
  faCartShopping,
  faBolt,
  faWallet,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

export default function Transactions() {
  // Dummy Data for Transactions
  const transactions = [
    {
      id: 1,
      date: "01/01/2025",
      description: "Groceries",
      amount: -50.0,
      category: "Shopping",
    },
    {
      id: 2,
      date: "01/02/2025",
      description: "Freelance Payment",
      amount: 500.0,
      category: "Salary",
    },
    {
      id: 3,
      date: "01/03/2025",
      description: "Electricity Bill",
      amount: -120.0,
      category: "Electricity",
    },
    {
      id: 4,
      date: "01/04/2025",
      description: "Coffee",
      amount: -5.5,
      category: "Food",
    },
    {
      id: 5,
      date: "01/05/2025",
      description: "Online Purchase",
      amount: -200.0,
      category: "Shopping",
    },
    {
      id: 6,
      date: "01/05/2025",
      description: "Online Food",
      amount: -200.0,
      category: "Food",
    },
    {
      id: 7,
      date: "09/05/2025",
      description: "Furniture Sales",
      amount: 200.0,
      category: "Sales",
    },
    {
      id: 8,
      date: "10/05/2025",
      description: "Watch Movie",
      amount: -200.0,
      category: "Entertainment",
    },
    {
      id: 9,
      date: "01/05/2025",
      description: "Health Checkup",
      amount: -200.0,
      category: "Health",
    },
    {
      id: 10,
      date: "01/06/2025",
      description: "Salary",
      amount: 200.0,
      category: "Salary",
    },
    {
      id: 11,
      date: "01/06/2025",
      description: "Donation",
      amount: -200.0,
      category: "Charity",
    },
  ];

  const [type, setType] = useState("");
  const [showCategory, setShowCategory] = useState("");

  // Filter transactions by type and category
  const filteredTransactions = transactions.filter((transaction) => {
    const isTypeMatch = type
      ? (type === "income" && transaction.amount > 0) ||
        (type === "expenses" && transaction.amount < 0)
      : true;

    const isCategoryMatch = showCategory
      ? transaction.category === showCategory
      : true;

    return isTypeMatch && isCategoryMatch;
  });

  return (
    <>
      <div className="bg-white flex justify-between items-center px-10 w-full h-[70px]">
        <h2 className="text-2xl font-bold">TRANSACTIONS</h2>
        <FontAwesomeIcon icon={faUser} />
      </div>

      <div className="flex gap-10 mx-10 my-6 items-center">
        <fieldset className="border-2 border-gray-500 rounded-xl">
          <legend className="ml-4 text-xl px-1 text-gray-600 ">
            Current Status
          </legend>
          <div className="py-7 pl-6 pr-[70px]">
            <div className="font-bold text-3xl ">$2000.45</div>
            <div className="text-gray-600">Current balance status </div>
          </div>
        </fieldset>
        <fieldset className="border-2 border-gray-500 rounded-xl">
          <legend className="ml-4 text-xl px-1 text-gray-600">per year</legend>
          <div className="flex gap-10 py-7 px-8">
            <div className="text-green-500 flex items-center">
              <FontAwesomeIcon icon={faArrowUp} className="text-[40px]" />
              <div>
                <div className="text-center">Income</div>
                <div className="text-2xl font-semibold text-center">
                  +$ 700,892{" "}
                </div>
              </div>
            </div>
            <div className="text-red-500 flex items-center ">
              <FontAwesomeIcon icon={faArrowDown} className="text-[40px]" />
              <div>
                <div className="text-center">Expenses</div>
                <div className="text-2xl font-semibold text-center">
                  -$ 680,892{" "}
                </div>
              </div>
            </div>
            <div className="text-blue-400 border-l-2 px-6 border-gray-500">
              <div className="text-center">Count</div>
              <div className="text-2xl font-semibold text-center">15</div>
            </div>
          </div>
        </fieldset>
        <fieldset className="border-2 border-gray-500 rounded-xl">
          <legend className="ml-4 text-xl px-1 text-gray-600 ">
            Current Status
          </legend>
          <div className="py-6 pl-6 pr-[70px]">
            <div className="font-bold text-3xl ">$2000.45</div>
            <div className="text-gray-600">Current balance status </div>
          </div>
        </fieldset>
      </div>
      <div className=" mx-10 my-8 mr-[90px]">
        <button className="bg-emerald-400 text-white px-6 py-3 rounded-lg text-xl">
          Add Transactions
        </button>
      </div>
      <div className="p-6 bg-white mr-[20px] rounded-lg ">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-gray-500">
            All Transactions
          </h3>
        </div>
        <div className="mb-6 flex justify-between mr-10 ">
          <div className="flex gap-4">
            <button
              onClick={() => setType("income")}
              className={`border-2 border-green-500 text-green-500 px-4 py-1 rounded-md ${
                type === "income" ? "income-clicked" : ""
              }`}
            >
              Income
            </button>
            <button
              onClick={() => setType("expenses")}
              className={`border-2 border-red-500 text-red-500 px-4 py-1 rounded-md ${
                type === "expenses" ? "expense-clicked" : ""
              }`}
            >
              Expenses
            </button>
          </div>
          <div>
            <select
              name=""
              id=""
              className="border-2 border-gray-500 px-4 py-2 rounded-md cursor-pointer"
              onChange={(e) => setShowCategory(e.target.value)}
            >
              <option value="">Select By Category</option>
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Electricity">Electricity</option>
              <option value="Salary">Salary</option>
              <option value="Charity">Charity</option>
              <option value="Health">Health</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-300">
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{transaction.date}</td>
                <td className="px-4 py-2 border">{transaction.description}</td>
                <td
                  className={`px-4 py-2 border ${
                    transaction.amount < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {transaction.amount < 0
                    ? `-$${Math.abs(transaction.amount)}`
                    : `+$${transaction.amount}`}
                </td>
                <td className="text-center border">
                  <div
                    className={`${
                      transaction.amount < 0
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    } my-2 mx-auto w-[120px] py-1 rounded-lg`}
                  >
                    {transaction.category}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
