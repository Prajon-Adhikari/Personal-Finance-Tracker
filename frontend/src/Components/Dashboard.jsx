import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import ReactApexChart from "react-apexcharts";
import Panel from "./Panel";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";

class AreaChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      options: {
        chart: {
          height: 300,
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          categories: [
            "2018-09-19T00:00:00.000Z",
            "2018-09-19T01:30:00.000Z",
            "2018-09-19T02:30:00.000Z",
            "2018-09-19T03:30:00.000Z",
            "2018-09-19T04:30:00.000Z",
            "2018-09-19T05:30:00.000Z",
            "2018-09-19T06:30:00.000Z",
          ],
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
      },
    };
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.options}
        series={this.state.series}
        type="area"
        height={300}
        width={460}
      />
    );
  }
}

export default function Dashboard() {
  const [pieChartState, setPieChartState] = useState({
    series: [44, 55, 20],
    options: {
      chart: {
        type: "pie",
      },
      colors: ["#FF407D", "#6C48C5", "#FAB12F"], // Custom colors
      labels: ["Food", "Clothes", "Others"],
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
  ];

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
              <div className="text-3xl font-bold">$ 3445.78</div>
              <div className="text-gray-400">Total earnings this month</div>
            </div>
            <div>
              <div className="text-3xl font-bold">82</div>
              <div className="text-gray-400">Transactions processed</div>
            </div>
            <button className="bg-pink-600 rounded text-white py-2">
              Look Summary
            </button>
          </div>
          <AreaChart />
        </div>
        <div className="bg-white rounded-xl flex justify-center flex-col px-6 shadow-lg">
          <div className="pb-4 font-bold text-2xl">Expenses</div>
          <ReactApexChart
            options={pieChartState.options}
            series={pieChartState.series}
            type="pie"
            width={360}
          />
        </div>
      </div>
      <div className="flex gap-4 py-8">
        <Panel
          title="Total Earning"
          figure={faChartSimple}
          amount="4000.8"
          date="Jan01- Jan29"
          begColor="from-pink-600"
          midColor="via-pink-500"
          endColor="to-customPurple1"
        />
        <Panel
          title="Total Earning"
          figure={faChartSimple}
          amount="4000.8"
          date="Jan01- Jan29"
          begColor="from-customPurple1"
          midColor="via-customBlue"
          endColor="to-customBlue1"
        />
        <Panel
          title="Total Earning"
          figure={faChartSimple}
          amount="4000.8"
          date="Jan01- Jan29"
          begColor="from-customTeal"
          midColor="via-customTeal1"
          endColor="to-customTeal3"
        />
        <Panel
          title="Total Earning"
          figure={faChartSimple}
          amount="4000.8"
          date="Jan01- Jan29"
          begColor="from-customGold"
          midColor="via-customGold1"
          endColor="to-customGold2"
        />
      </div>
      <div className="p-6 bg-white mr-[20px] rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Recent Transactions</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Category</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
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
                {transaction.amount < 0 ? (
                  <td className="text-center">
                    <div className="bg-red-500 text-white my-2 mx-auto w-[100px] py-1 rounded-lg">
                      {transaction.category}
                    </div>
                  </td>
                ) : (
                  <td className="text-center">
                    <div className="bg-green-500 text-white  my-2 mx-auto w-[100px] py-1 rounded-lg">
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
