import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import Panel from "./Panel";
import {
  faChartSimple,
  faUtensils,
  faCartShopping,
  faBolt,
  faWallet,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const today = new Date();
  const yearMonth = today.toISOString().slice(0, 7);

  const [transactions, setTransactions] = useState([]);
  const [finalIncome, setFinalIncome] = useState("");
  const [finalExpense, setFinalExpense] = useState("");
  const [transactionCount, setTransactionCount] = useState("");

  const [areaChartData, setAreaChartData] = useState({
    series: [],
    options: {
      chart: {
        height: 300,
        type: "area",
        zoom: { enabled: false },
      },
      colors: ["#88D66C", "#F75454"],
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 4 },
      fill: { opacity: 0.3 },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      tooltip: { enabled: true },
    },
  });

  const [pieChartData, setPieChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "pie",
      },
      colors: [
        "#FF9100",
        "#914F1E",
        "#000957",
        "#B03052",
        "#F95454",
        "#FF6600",
        "#000000",
      ], // Custom colors
      labels: [
        "Food",
        "Shopping",
        "Entertainment",
        "Health",
        "Charity",
        "Electricity",
        "Others",
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    fetchTransactionData();
  }, []);

  const fetchTransactionData = async () => {
    const response = await fetch("http://localhost:8000/menu/dashboard");
    const data = await response.json();

    let FoodData = 0;
    let ShoppingData = 0;
    let EntertainmentData = 0;
    let HealthData = 0;
    let ElectricityData = 0;
    let CharityData = 0;
    let OtherData = 0;

    let totalIncome = 0;
    let totalExpense = 0;

    let income = Array(12).fill(0);
    let expense = Array(12).fill(0);

    data.transactions.map((item) => {
      const date = new Date(item.date);
      const monthIndex = date.getMonth();

      const amount = parseFloat(item.amount);
      if (item.category === "Food") {
        FoodData += amount;
      } else if (item.category === "Shopping") {
        ShoppingData += amount;
      } else if (item.category === "Entertainment") {
        EntertainmentData += amount;
      } else if (item.category === "Health") {
        HealthData += amount;
      } else if (item.category === "Charity") {
        CharityData += amount;
      } else if (item.category === "Electricity") {
        ElectricityData += amount;
      } else if (item.category === "Other") {
        OtherData += amount;
      }

      if (item.transactionType === "income") {
        totalIncome += amount;
        income[monthIndex] += amount;
      } else if (item.transactionType === "expense") {
        totalExpense += amount;
        expense[monthIndex] += amount;
      }
    });

    const expenseSeries = [
      FoodData,
      ShoppingData,
      EntertainmentData,
      HealthData,
      CharityData,
      ElectricityData,
      OtherData,
    ];

    const areaChartSeries = [
      { name: "Income", data: income },
      { name: "Expense", data: expense },
    ];

    setFinalIncome(totalIncome);
    setFinalExpense(totalExpense);
    setTransactionCount(data.transactions.length);
    setPieChartData((prevState) => ({
      ...prevState,
      series: expenseSeries,
    }));
    setAreaChartData((prevState) => ({
      ...prevState,
      series: areaChartSeries,
    }));
    setTransactions(data.recentTransactions);
  };

  return (
    <div className="w-full">
      <div className="bg-white flex justify-between items-center px-10 w-full h-[70px]">
        <h2 className="text-2xl text-slate-600 font-bold">DASHBOARD</h2>
        <FontAwesomeIcon icon={faUser} />
      </div>
      <div className="flex gap-6 mt-4">
        <div className="w-[780px] p-6 flex justify-between rounded-xl bg-white shadow-lg">
          <div className="flex flex-col gap-8">
            <div>
              <div className="text-xl">Dashboard</div>
              <div className="text-gray-400">Overview of your stats</div>
            </div>
            <div>
              <div className="text-3xl font-bold">$ {finalIncome}</div>
              <div className="text-gray-400">Total earnings this year</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{transactionCount}</div>
              <div className="text-gray-400">Transactions processed</div>
            </div>
            <button className="bg-pink-600 rounded text-white py-2">
              Look Summary
            </button>
          </div>
          <ReactApexChart
            options={areaChartData.options}
            series={areaChartData.series}
            type="area"
            height={420}
            width={450}
          />
        </div>
        <div className="bg-white rounded-xl flex justify-center flex-col px-6 shadow-lg">
          <div className="pb-4 font-bold text-2xl">Expenses</div>
          <ReactApexChart
            options={pieChartData.options}
            series={pieChartData.series}
            type="pie"
            width={360}
          />
        </div>
      </div>
      <div className="flex gap-4 py-8">
        <Panel
          title="Total Earning"
          figure={faChartSimple}
          amount={`${finalIncome}`}
          date="Jan01- Dec-31"
          begColor="from-pink-500"
          midColor="via-pink-600"
          endColor="to-pink-700"
        />
        <Panel
          title="Total Expenses"
          figure={faChartSimple}
          amount={`${finalExpense}`}
          date="Jan01- Dec31"
          begColor="from-customPurple1"
          midColor="via-customBlue"
          endColor="to-customBlue1"
        />
        <Panel
          title="Total Earning"
          figure={faChartSimple}
          amount={`${finalIncome}`}
          date="Jan01- De31"
          begColor="from-customTeal"
          midColor="via-customTeal1"
          endColor="to-customTeal3"
        />
        <Panel
          title="Total Earning"
          figure={faChartSimple}
          amount={`${finalIncome}`}
          date="Jan01- Dec31"
          begColor="from-customGold"
          midColor="via-customGold1"
          endColor="to-customGold2"
        />
      </div>
      <div className="p-6 bg-white mr-[20px] rounded-lg ">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold mb-4">Recent Transactions</h3>
          <button className="bg-red-700 px-4 py-1 rounded-lg mr-2 mb-2 text-white">
            <Link to={`/menu/transactions/${yearMonth}`}>View All</Link>
          </button>
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
            {transactions.map((transaction) => (
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
                {transaction.transactionType === "expense" ? (
                  <td className="text-center border">
                    <div className="bg-red-500 text-white my-2 mx-auto w-[140px] py-1 rounded-lg">
                      {transaction.category === "Shopping" ? (
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          className="pr-2"
                        />
                      ) : transaction.category === "Food" ? (
                        <FontAwesomeIcon icon={faUtensils} className="pr-2" />
                      ) : transaction.category === "Salary" ? (
                        <FontAwesomeIcon icon={faWallet} className="pr-2" />
                      ) : transaction.category === "Electricity" ? (
                        <FontAwesomeIcon icon={faBolt} className="pr-2" />
                      ) : (
                        <FontAwesomeIcon icon={faDollarSign} className="pr-2" />
                      )}
                      {transaction.category}
                    </div>
                  </td>
                ) : (
                  <td className="text-center border">
                    <div className="bg-green-500 text-white  my-2 mx-auto w-[140px] py-1 rounded-lg">
                      {transaction.category === "Shopping" ? (
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          className="pr-2"
                        />
                      ) : transaction.category === "Food" ? (
                        <FontAwesomeIcon icon={faUtensils} className="pr-2" />
                      ) : transaction.category === "Salary" ? (
                        <FontAwesomeIcon icon={faWallet} className="pr-2" />
                      ) : transaction.category === "Electricity" ? (
                        <FontAwesomeIcon icon={faBolt} className="pr-2" />
                      ) : (
                        <FontAwesomeIcon icon={faDollarSign} className="pr-2" />
                      )}
                      {transaction.category}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
