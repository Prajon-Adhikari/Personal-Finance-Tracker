import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";

export default function Reports() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    today.toISOString().slice(0, 7)
  );

  const navigate = useNavigate();

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [highestExpenseCategory, setHighestExpenseCategory] = useState("");
  const [highestIncomeWeek, setHighestIncomeWeek] = useState("");
  const [highestExpenseWeek, setHighestExpenseWeek] = useState("");

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [maxMonth, setMaxMonth] = useState(currentMonth);

  const handleMonthChange = (e) => {
    const chosenMonth = e.target.value;
    if (chosenMonth === "") {
      setSelectedMonth(currentMonth);
    } else {
      setSelectedMonth(chosenMonth);
    }
  };

  const getPreviousMonth = (month) => {
    const [year, monthIndex] = month.split("-").map(Number);
    const previousMonthDate = new Date(year, monthIndex - 1);
    return previousMonthDate.toISOString().slice(0, 7);
  };

  const [barChartData, setBarChartData] = useState({
    series: [],
    categories: [],
  });
  const [areaChartData, setAreaChartData] = useState({
    series: [],
    options: {
      chart: {
        height: 300,
        type: "area",
        zoom: { enabled: false },
      },
      colors: [
        "#6EC207",
        "#D2649A",
        "#FF9100",
        "#914F1E",
        "#000957",
        "#B03052",
        "#F95454",
        "#FF6600",
        "#000000",
      ],
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 4 },
      fill: { opacity: 0.3 },
      xaxis: { categories: ["Week 1", "Week 2", "Week 3", "Week 4"] },
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

  const [lineChartData, setLineChartData] = useState({
    series: [],
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
        text: "Comparison between current and previous month transactions",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // alternating row colors
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [],
      },
    },
  });

  useEffect(() => {
    navigate(`/menu/reports/${selectedMonth}`);
    const previousMonth = getPreviousMonth(selectedMonth);
    console.log(previousMonth);
    fetchBarGraphData(selectedMonth);
    fetchAreaChartData(selectedMonth);
    fetchPieChartData(selectedMonth);
    fetchLineGraphData(selectedMonth, previousMonth);
  }, [selectedMonth]);

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
          incomeData[weekIndex] += amount; // Accumulate income
        } else if (item.transactionType === "expense") {
          expenseData[weekIndex] += amount; // Accumulate expenses
        }
      });

      const totalIncomeCalculated = incomeData.reduce(
        (sum, week) => sum + week,
        0
      );
      const totalExpenseCalculated = expenseData.reduce(
        (sum, week) => sum + week,
        0
      );

      setTotalIncome(totalIncomeCalculated);
      setTotalExpense(totalExpenseCalculated);

      let incomeWeek = incomeData[0];
      let expenseWeek = expenseData[0];

      for (let i = 0; i < incomeData.length; i++) {
        const weekTotal = incomeData[i];
        if (weekTotal > incomeWeek) {
          incomeWeek = weekTotal;
        }
      }

      for (let i = 0; i < expenseData.length; i++) {
        const weekTotal = expenseData[i];
        if (weekTotal > expenseWeek) {
          expenseWeek = weekTotal;
        }
      }

      setHighestIncomeWeek(incomeWeek);
      setHighestExpenseWeek(expenseWeek);

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

  const fetchAreaChartData = async (month) => {
    try {
      const response = await fetch(
        `http://localhost:8000/menu/reports/${month}`
      );
      const data = await response.json();

      const FoodData = [0, 0, 0, 0];
      const ShoppingData = [0, 0, 0, 0];
      const SalesData = [0, 0, 0, 0];
      const EntertainmentData = [0, 0, 0, 0];
      const HealthData = [0, 0, 0, 0];
      const ElectricityData = [0, 0, 0, 0];
      const OtherData = [0, 0, 0, 0];
      const SalaryData = [0, 0, 0, 0];
      const CharityData = [0, 0, 0, 0];

      // Aggregate data into weeks
      data.forEach((item) => {
        const date = new Date(item.date); // Parse the date from the data item
        const dayOfMonth = date.getDate(); // Get the day of the month
        const weekIndex = Math.ceil(dayOfMonth / 7) - 1; // Calculate week index (0-based)

        const amount = parseFloat(item.amount);
        if (item.category === "Food") {
          FoodData[weekIndex] += amount;
        } else if (item.category === "Shopping") {
          ShoppingData[weekIndex] += amount;
        } else if (item.category === "Sales") {
          SalesData[weekIndex] += amount;
        } else if (item.category === "Entertainment") {
          EntertainmentData[weekIndex] += amount;
        } else if (item.category === "Health") {
          HealthData[weekIndex] += amount;
        } else if (item.category === "Charity") {
          CharityData[weekIndex] += amount;
        } else if (item.category === "Other Expense") {
          OtherData[weekIndex] += amount;
        } else if (item.category === "Electricity") {
          ElectricityData[weekIndex] += amount;
        } else if (item.category === "Salary") {
          SalaryData[weekIndex] += amount;
        }
      });

      const series = [
        { name: "Sales", data: SalesData },
        { name: "Salaries", data: SalaryData },
        { name: "Food", data: FoodData },
        { name: "Shopping", data: ShoppingData },
        { name: "Entertainment", data: EntertainmentData },
        { name: "Health", data: HealthData },
        { name: "Charity", data: CharityData },
        { name: "Electricity", data: ElectricityData },
        { name: "Others", data: OtherData },
      ];

      const expenseSeries = [
        { name: "Food", data: FoodData },
        { name: "Shopping", data: ShoppingData },
        { name: "Entertainment", data: EntertainmentData },
        { name: "Health", data: HealthData },
        { name: "Charity", data: CharityData },
        { name: "Electricity", data: ElectricityData },
        { name: "Others", data: OtherData },
      ];

      const caluclateTotal = (array) =>
        array.reduce((sum, value) => sum + value, 0);

      let highestData = expenseSeries[0];
      let highestTotal = caluclateTotal(highestData.data);

      for (let i = 0; i < expenseSeries.length; i++) {
        const total = caluclateTotal(expenseSeries[i].data);
        if (total > highestTotal) {
          highestData = expenseSeries[i];
          highestTotal = total;
        }
      }

      setHighestExpenseCategory(highestData.name);

      setAreaChartData((prevState) => ({
        ...prevState,
        series: series,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPieChartData = async (yearMonth) => {
    try {
      const response = await fetch(
        `http://localhost:8000/menu/reports/${yearMonth}`
      );
      const data = await response.json();

      let FoodData = 0;
      let ShoppingData = 0;
      let EntertainmentData = 0;
      let HealthData = 0;
      let ElectricityData = 0;
      let CharityData = 0;
      let OtherData = 0;

      data.forEach((item) => {
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
        } else if (item.category === "Other Expense") {
          OtherData += amount;
        } else if (item.category === "Electricity") {
          ElectricityData += amount;
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

      setPieChartData((prevState) => ({
        ...prevState,
        series: expenseSeries,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLineGraphData = async (month, prevMonth) => {
    try {
      const response = await fetch(
        `http://localhost:8000/menu/reports/${month}`
      );
      const data = await response.json();

      const prevRespnse = await fetch(
        `http://localhost:8000/menu/reports/${prevMonth}`
      );
      const prevData = await prevRespnse.json();

      const categories = [
        "Sales",
        "Salary",
        "Food",
        "Shopping",
        "Entertainment",
        "Health",
        "Charity",
        "Electricity",
        "Others",
      ];

      let SalesData = 0;
      let SalaryData = 0;
      let FoodData = 0;
      let ShoppingData = 0;
      let EntertainmentData = 0;
      let HealthData = 0;
      let ElectricityData = 0;
      let CharityData = 0;
      let OtherData = 0;

      data.forEach((item) => {
        const amount = parseFloat(item.amount);
        if (item.category === "Food") {
          FoodData += amount;
        } else if (item.category === "Shopping") {
          ShoppingData += amount;
        } else if (item.category === "Sales") {
          SalesData += amount;
        } else if (item.category === "Salary") {
          SalaryData += amount;
        } else if (item.category === "Entertainment") {
          EntertainmentData += amount;
        } else if (item.category === "Health") {
          HealthData += amount;
        } else if (item.category === "Charity") {
          CharityData += amount;
        } else if (item.category === "Other Expense") {
          OtherData += amount;
        } else if (item.category === "Electricity") {
          ElectricityData += amount;
        }
      });

      const expenseSeries = [
        SalesData,
        SalaryData,
        FoodData,
        ShoppingData,
        EntertainmentData,
        HealthData,
        CharityData,
        ElectricityData,
        OtherData,
      ];

      let prevSalesData = 0;
      let prevSalaryData = 0;
      let prevFoodData = 0;
      let prevShoppingData = 0;
      let prevEntertainmentData = 0;
      let prevHealthData = 0;
      let prevElectricityData = 0;
      let prevCharityData = 0;
      let prevOtherData = 0;

      prevData.forEach((item) => {
        const prevAmount = parseFloat(item.amount);
        if (item.category === "Food") {
          prevFoodData += prevAmount;
        } else if (item.category === "Sales") {
          prevSalesData += prevAmount;
        } else if (item.category === "Salary") {
          prevSalaryData += prevAmount;
        } else if (item.category === "Shopping") {
          prevShoppingData += prevAmount;
        } else if (item.category === "Entertainment") {
          prevEntertainmentData += prevAmount;
        } else if (item.category === "Health") {
          prevHealthData += prevAmount;
        } else if (item.category === "Charity") {
          prevCharityData += prevAmount;
        } else if (item.category === "Other Expense") {
          prevOtherData += prevAmount;
        } else if (item.category === "Electricity") {
          prevElectricityData += prevAmount;
        }
      });

      const prevExpenseSeries = [
        prevSalesData,
        prevSalaryData,
        prevFoodData,
        prevShoppingData,
        prevEntertainmentData,
        prevHealthData,
        prevCharityData,
        prevElectricityData,
        prevOtherData,
      ];

      console.log(expenseSeries);
      console.log(prevExpenseSeries);
      setLineChartData({
        series: [
          {
            name: "Current Month",
            data: expenseSeries,
          },
          {
            name: "Previous Month",
            data: prevExpenseSeries,
          },
        ],
        options: {
          ...lineChartData.options, // Spread the existing options
          xaxis: { categories: categories },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-white flex rounded-bl-xl justify-between items-center px-10 w-full h-[70px]">
        <h2 className="text-2xl  text-slate-600 font-bold">REPORTS</h2>
        <FontAwesomeIcon
          className="bg-slate-200 text-gray-500 cursor-pointer px-[12px] py-[10px] mr-4 text-xl rounded-full "
          icon={faUser}
        />
      </div>
      <div className="bg-white min-h-[700px] mt-4 px-12 py-8 rounded-lg">
        <div className="flex justify-end gap-8">
          <input
            type="month"
            className="border-2 px-4 py-1 rounded-lg border-black"
            value={selectedMonth}
            max={maxMonth}
            onChange={handleMonthChange}
          />
          <button className="text-white py-1 px-4 rounded-lg text-lg font-semibold bg-black">
            Export
          </button>
        </div>
        <div className="mt-12 flex justify-between">
          <div className="w-[420px] p-6 rounded-md shadow-[0px_0px_5px] border-slate-300">
            <div className="flex justify-between items-center">
              <div className="font-bold text-3xl">Monthly Analysis</div>
              <div className="font-medium text-lg">{selectedMonth}</div>
            </div>
            <div className="font-semibold text-2xl pt-2 pb-6">Summary</div>
            <div className="py-4 font-medium text-lg">
              {" "}
              Total Income : ${totalIncome}
            </div>
            <div className="py-4 font-medium text-lg border-b-2">
              Total Expenses : ${totalExpense}
            </div>
            <div className="py-4 font-medium text-lg">
              {" "}
              Net Balance : ${totalIncome - totalExpense}
            </div>
            <div className="py-4 font-medium">
              Highest Spending Category :
              <span className="px-3 py-2 bg-red-500 rounded-lg text-white ml-2">
                {highestExpenseCategory}
              </span>
            </div>
          </div>
          <div className="shadow-[0px_0px_5px] pl-8 items-center gap-[60px] border-slate-300 rounded-md flex p-4 ">
            <div className="flex flex-col gap-8">
              <div>
                <div className="font-semibold text-xl">
                  {" "}
                  Highest Gained in a Week
                </div>
                <div className=" text-lg">${highestIncomeWeek}</div>
              </div>
              <div>
                <div className="font-semibold text-xl">
                  {" "}
                  Highest Expensed in a Week
                </div>
                <div className=" text-lg">${highestExpenseWeek}</div>
              </div>
              <div>
                <div className="font-semibold text-xl"> Net Balance</div>
                <div className=" text-lg"> ${totalIncome - totalExpense}</div>
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
            <ReactApexChart
              options={areaChartData.options}
              series={areaChartData.series}
              type="area"
              height={420}
              width={950}
            />
            <div className="flex items-center gap-[100px]">
              <div className=" rounded-lg p-4 border-slate-200">
                <div className="pb-4 font-bold text-2xl">Expenses</div>
                <ReactApexChart
                  options={pieChartData.options}
                  series={pieChartData.series}
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
                    {pieChartData.options.labels.map((label, index) => {
                      // Calculate percentage for each category
                      const total = pieChartData.series.reduce(
                        (sum, value) => sum + value,
                        0
                      );
                      const percentage = (
                        (pieChartData.series[index] / total) *
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
                options={lineChartData.options}
                series={lineChartData.series}
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
