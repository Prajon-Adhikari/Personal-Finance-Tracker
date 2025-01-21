const express = require("express");
const cors = require("cors");
const { router: userRoute } = require("./routes/user.js");
const transactionRoute = require("./routes/transactions.js");
const reportRoute = require("./routes/reports.js");
const dashboardRoute = require("./routes/dashboard.js");
// const settingRoute = require("./routes/setting.js");
const mongoose = require("mongoose");

const PORT = 8000;
const app = express();

mongoose
  .connect("mongodb://localhost:27017/Personal-Finance-Tracker")
  .then((e) => console.log("MongoDB connnected"));

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoute);
app.use("/menu/transactions", transactionRoute);
app.use("/menu/reports", reportRoute);
app.use("/menu/dashboard", dashboardRoute);

app.listen(PORT, () => console.log(`Server is listening at ${PORT}`));
