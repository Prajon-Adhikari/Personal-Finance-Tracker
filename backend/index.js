const express = require("express");
const cors = require("cors");
const userRoute = require("./models/user.js");

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

app.get("/user", userRoute);

app.listen(PORT, () => console.log(`Server is listening at ${PORT}`));
