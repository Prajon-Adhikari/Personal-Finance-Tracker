const express = require("express");
const User = require("../models/user.js");

const router = express.Router();

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    return res.status(200).json({
      message: "Sign In successfully",
    });
  } catch (error) {
    return res.status(500).json("Error:", error);
  }
});

const userMiddleWare = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving user details" });
  }
};

router.post("/signup", async (req, res) => {
  const { fullName, email, password, mobile } = req.body;
  try {
    const user = await User.create({
      fullName,
      email,
      password,
      mobile,
    });
    console.log(user);
    return res.status(200).json({ message: "User register successfully" });
  } catch (error) {
    console.log("Error: Unsuccessfull registration", error);
    return res.status(500).json({ message: "Unsuccessfull Registration" });
  }
});

module.exports = router;
