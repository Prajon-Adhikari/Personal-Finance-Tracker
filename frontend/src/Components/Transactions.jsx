import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import AddTransactions from "./AddTransactions";
import { MyContext } from "./MyContext";
import { useNavigate } from "react-router-dom";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  const [type, setType] = useState("");
  const [showCategory, setShowCategory] = useState("");
  const [showAddTransactions, setShowAddTransactions] = useState(false);
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    today.toISOString().slice(0, 7)
  );

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [maxMonth, setMaxMonth] = useState(currentMonth);
  const [totalIncome, setTotalIncome] = useState("");
  const [totalExpense, setTotalExpense] = useState("");
  const [transactionCount, setTransactionCount] = useState("");

  const handleMonthChange = (e) => {
    const chosenMonth = e.target.value;
    if (chosenMonth === "") {
      setSelectedMonth(currentMonth);
    } else {
      setSelectedMonth(chosenMonth);
    }
  };

  useEffect(() => {
    fetchTransactionData(selectedMonth);
    navigate(`/menu/transactions/${selectedMonth}`);
  }, [selectedMonth]);

  const fetchTransactionData = async (yearMonth) => {
    try {
      const response = await fetch(
        `http://localhost:8000/menu/transactions/${yearMonth}`
      );
      const data = await response.json();
      const transactions = data.transactions || [];
      setTransactions(transactions);

      let finalIncome = 0;
      let finalExpense = 0;

      transactions.forEach((item) => {
        let amount = parseFloat(item.amount);
        if (item.transactionType === "income") {
          finalIncome += amount;
        } else {
          finalExpense += amount;
        }
      });

      setTotalIncome(finalIncome);
      setTotalExpense(finalExpense);
      setTransactionCount(transactions.length);
    } catch (error) {
      console.log(error);
    }
  };

  // Filter transactions by type and category
  const filteredTransactions = transactions.filter((transaction) => {
    const isTypeMatch = type
      ? (type === "income" && transaction.transactionType === "income") ||
        (type === "expenses" && transaction.transactionType === "expense")
      : true;

    const isCategoryMatch = showCategory
      ? transaction.category === showCategory
      : true;

    return isTypeMatch && isCategoryMatch;
  });

  const sortedTransactions = filteredTransactions.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

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
            <div className="font-bold text-3xl ">
              ${totalIncome - totalExpense}
            </div>
            <div className="text-gray-600">Current balance status </div>
          </div>
        </fieldset>
        <fieldset className="border-2 border-gray-500 rounded-xl">
          <legend className="ml-4 text-xl px-1 text-gray-600">
            this month
          </legend>
          <div className="flex gap-10 py-7 px-8">
            <div className="text-green-500 flex items-center">
              <FontAwesomeIcon icon={faArrowUp} className="text-[40px]" />
              <div>
                <div className="text-center">Income</div>
                <div className="text-2xl font-semibold text-center">
                  +$ {totalIncome}
                </div>
              </div>
            </div>
            <div className="text-red-500 flex items-center ">
              <FontAwesomeIcon icon={faArrowDown} className="text-[40px]" />
              <div>
                <div className="text-center">Expenses</div>
                <div className="text-2xl font-semibold text-center">
                  -$ {totalExpense}
                </div>
              </div>
            </div>
            <div className="text-blue-400 border-l-2 px-6 border-gray-500">
              <div className="text-center">Count</div>
              <div className="text-2xl font-semibold text-center">
                {transactionCount}
              </div>
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
        <button
          className="bg-emerald-400 text-white px-6 py-3 rounded-lg text-xl"
          onClick={() => setShowAddTransactions(true)}
        >
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
              onClick={() =>
                type === "income" ? setType("") : setType("income")
              }
              className={`border-2 border-green-500 text-green-500 px-4 py-1 rounded-md ${
                type === "income" ? "income-clicked" : ""
              }`}
            >
              Income
            </button>
            <button
              onClick={() =>
                type === "expenses" ? setType("") : setType("expenses")
              }
              className={`border-2 border-red-500 text-red-500 px-4 py-1 rounded-md ${
                type === "expenses" ? "expense-clicked" : ""
              }`}
            >
              Expenses
            </button>
          </div>
          <div className="flex gap-8">
            <input
              type="month"
              className="border-2 px-4 py-1 rounded-lg border-black"
              value={selectedMonth}
              max={maxMonth}
              onChange={handleMonthChange}
            />
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
              <th className="px-4 py-2 border text-center">Category</th>
              <th className="px-4 py-2 border text-center">Edit</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction) => (
              <tr key={transaction._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">
                  {transaction.date.slice(0, 10)}
                </td>
                <td className="px-4 py-2 border">{transaction.title}</td>
                <td
                  className={`px-4 py-2 border ${
                    transaction.transactionType === "expense"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {transaction.transactionType === "expense"
                    ? `-$${Math.abs(transaction.amount)}`
                    : `+$${transaction.amount}`}
                </td>
                <td className="text-center border">
                  <div
                    className={`${
                      transaction.transactionType === "expense"
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    } my-2 mx-auto w-[120px] py-1 rounded-lg`}
                  >
                    {transaction.category}
                  </div>
                </td>
                <td className="py-3 border flex gap-3 justify-center  ">
                  <div className="bg-blue-400 text-white py-1 px-2 rounded cursor-pointer">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </div>
                  <div className="bg-red-400 text-white py-1 px-2 rounded cursor-pointer">
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddTransactions ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <MyContext.Provider value={{ setShowAddTransactions }}>
            <AddTransactions month={selectedMonth} />
          </MyContext.Provider>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
