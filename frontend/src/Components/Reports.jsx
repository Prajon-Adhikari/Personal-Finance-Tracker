import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import ReactApexChart from "react-apexcharts";

class AreaChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
          name: "Food",
          data: [31, 55, 28, 51],
        },
        {
          name: "Shooping",
          data: [20, 32, 45, 32],
        },
        {
          name: "Electricity",
          data: [11, 22, 25, 20],
        },
        {
          name: "Entertainment",
          data: [0, 34, 26, 18],
        },
        {
          name: "Health",
          data: [0, 15, 32, 25],
        },
        {
          name: "Others",
          data: [15, 40, 20, 32],
        },
      ],
      options: {
        chart: {
          height: 300,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        colors: [
          "#D2649A",
          "#FF9100",
          "#914F1E",
          "#000957",
          "#B03052",
          "#F95454",
        ],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          width: 4,
          colors: [
            "#D2649A",
            "#FF9100",
            "#914F1E",
            "#000957",
            "#B03052",
            "#F95454",
          ],
        },
        fill: {
          opacity: 0,
        },
        xaxis: {
          categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
        },
        tooltip: {
          enabled: true,
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
        height={420}
        width={950}
      />
    );
  }
}

export default function Reports() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    today.toISOString().slice(0, 7)
  );
  const [barChartData, setBarChartData] = useState({
    series: [],
    categories: [],
  });

  useEffect(() => {
    fetchBarGraphData(currentMonth);
    console.log(currentMonth);
  }, [currentMonth]);

  const fetchBarGraphData = async (month) => {
    try {
      const response = await fetch(
        `http://localhost:8000/menu/reports/${month}`
      );
      const data = await response.json();

      // Map the data to create series for the bar graph
      const categories = ["Week 1", "Week 2", "Week 3", "Week 4"];
      const incomeData = [0, 0, 0, 0];
      const expenseData = [0, 0, 0, 0];

      // Aggregate data into weeks
      data.forEach((item) => {
        const date = new Date(item.date); // Parse the date from the data item
        const dayOfMonth = date.getDate(); // Get the day of the month
        const weekIndex = Math.ceil(dayOfMonth / 7) - 1; // Calculate week index (0-based)

        const amount = parseFloat(item.amount);
        if (item.transactionType === "income") {
          console.log(amount);
          incomeData[weekIndex] += amount; // Accumulate income
        } else if (item.transactionType === "expense") {
          console.log(item.amount);
          expenseData[weekIndex] += amount; // Accumulate expenses
        }
      });

      console.log(expenseData);

      setBarChartData({
        series: [
          {
            name: "Expenses",
            data: expenseData,
          },
          {
            name: "Income",
            data: incomeData,
          },
        ],
        categories: categories,
      });
    } catch (error) {
      console.error("Error fetching bar graph data:", error);
    }
  };

  const barChartOptions = {
    chart: {
      type: "bar",
      height: 400,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
    },
    xaxis: {
      categories: barChartData.categories,
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    colors: ["#F75454", "#88D66C"], // Custom colors for expenses and losses
    tooltip: {
      y: {
        formatter: (val) => `$ ${val} thousands`,
      },
    },
  };

  const [pieChartState, setPieChartState] = useState({
    series: [70, 55, 24, 30, 25, 15],
    options: {
      chart: {
        type: "pie",
      },
      colors: [
        "#D2649A",
        "#FF9100",
        "#914F1E",
        "#000957",
        "#B03052",
        "#F95454",
      ], // Custom colors
      labels: [
        "Food",
        "Shopping",
        "Electricity",
        "Entertainment",
        "Health",
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

  const lineChartState = {
    series: [
      {
        name: "Present Month",
        data: [120, 40, 21, 35, 22, 30, 20],
      },
      {
        name: "Previous Month", // New line series
        data: [100, 30, 25, 22, 12, 35, 22], // Data for the new line
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Product Trends by Month",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // alternating row colors
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Sales",
          "Food",
          "Shopping",
          "Electricity",
          "Entertainment",
          "Health",
          "Others",
        ],
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
                options={barChartOptions}
                series={barChartData.series}
                type="bar"
                height={400}
              />
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="rounded-md flex-col gap-12 items-center shadow-[0px_0px_5px] flex justify-center p-8">
            <AreaChart />
            <div className="flex items-center gap-[100px]">
              <div className=" rounded-lg p-4 border-slate-200">
                <div className="pb-4 font-bold text-2xl">Expenses</div>
                <ReactApexChart
                  options={pieChartState.options}
                  series={pieChartState.series}
                  type="pie"
                  width={400}
                />
              </div>
              <div>
                <table className="border-collapse border border-gray-400 text-left">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border w-[200px] border-gray-400 px-4 py-2">
                        Category
                      </th>
                      <th className="border w-[200px] border-gray-400 px-4 py-2">
                        Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pieChartState.options.labels.map((label, index) => {
                      // Calculate percentage for each category
                      const total = pieChartState.series.reduce(
                        (sum, value) => sum + value,
                        0
                      );
                      const percentage = (
                        (pieChartState.series[index] / total) *
                        100
                      ).toFixed(2);

                      return (
                        <tr key={index}>
                          <td className="border border-gray-400 px-4 py-2">
                            {label}
                          </td>
                          <td className="border border-gray-400 px-4 py-2">
                            {percentage}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="shadow-[0px_0px_5px] flex flex-col justify-center my-10 rounded-md px-10 py-6">
            <div className="flex justify-center">
              <ReactApexChart
                options={lineChartState.options}
                series={lineChartState.series}
                type="line"
                height={420}
                width={900}
              />
            </div>
            <div className="mx-[140px] my-10 text-xl">
              <ul className="flex flex-col gap-4 list-disc">
                <li>Sales is increased by - 20%</li>
                <li>Expense in Food is decreased by - 10%</li>
                <li>Expense in Shopping is increased by - 05%</li>
                <li>Electricity bill decreased by - 20%</li>
                <li>Expense in Entertainment is decreased by - 15%</li>
                <li>Expense in Health is increased by - 07%</li>
                <li>Other Expenses is increased by - 04%</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
