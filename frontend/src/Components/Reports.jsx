import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import ReactApexChart from "react-apexcharts";

export default function Reports() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    today.toISOString().slice(0, 7)
  );

  const chartState = {
    series: [
      {
        name: "Expense",
        data: [44, 55, 57, 56],
      },
      {
        name: "Revenue",
        data: [76, 85, 101, 98],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
        },
      },
      colors: ["#F95454", "#88D66C"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
      },
      yaxis: {
        title: {
          text: "$ (hundereds)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
  };

  return (
    <>
      <div className="bg-white flex justify-between items-center px-10 w-full h-[70px]">
        <h2 className="text-2xl font-bold">REPORTS</h2>
        <FontAwesomeIcon icon={faUser} />
      </div>
      <div className="bg-white min-h-[700px] mt-4 px-12 py-8 rounded-lg">
        <div className="flex justify-end gap-8">
          <input
            type="month"
            className="border-2 px-4 py-1 rounded-lg border-black"
            value={currentMonth}
            max={currentMonth}
            onChange={(e) => setCurrentMonth(e.target.value)}
          />
          <button className="text-white py-1 px-4 rounded-lg text-lg font-semibold bg-black">
            Export
          </button>
        </div>
        <div className="mt-12 flex justify-between">
          <div className="w-[450px] p-6 rounded-md shadow-[0px_0px_5px] border-slate-300">
            <div className="flex justify-between items-center">
              <div className="font-bold text-3xl">Monthly Analysis</div>
              <div className="font-medium text-lg">{currentMonth}</div>
            </div>
            <div className="font-semibold text-2xl pt-2 pb-6">Summary</div>
            <div className="py-4 font-medium text-lg">
              {" "}
              Total Income : $4000
            </div>
            <div className="py-4 font-medium text-lg border-b-2">
              Total Expenses : $3000
            </div>
            <div className="py-4 font-medium text-lg"> Net Balance : $1000</div>
            <div className="py-4 font-medium text-lg">
              Highest Spending Category :
              <span className="px-3 py-1 bg-red-500 rounded-lg text-white ml-8">
                Food
              </span>
            </div>
          </div>
          <div className="shadow-[0px_0px_5px] pl-8 items-center gap-[60px] border-slate-300 rounded-md flex p-4 ">
            <div className="flex flex-col gap-8">
              <div>
                <div className="font-semibold text-xl">
                  {" "}
                  Highest Gained Week
                </div>
                <div className=" text-lg">Week 3</div>
              </div>
              <div>
                <div className="font-semibold text-xl">
                  {" "}
                  Highest Expensed Week
                </div>
                <div className=" text-lg">Week 3</div>
              </div>
              <div>
                <div className="font-semibold text-xl"> Net Balance</div>
                <div className=" text-lg">$1000</div>
              </div>
            </div>
            <div className="w-[320px]">
              <ReactApexChart
                options={chartState.options}
                series={chartState.series}
                type="bar"
                height={280}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
