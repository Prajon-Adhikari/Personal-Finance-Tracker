const express = require("express");
const User = require("../models/user.js");

const router = express.Router();

router.get("/signup", async (req, res) => {
  const { firstName, lastName, email, password, mobile } = req.body;
  try {
    await User.create({
      firstName,
      lastName,
      email,
      password,
      mobile,
    });
    return res.status(200).json({ message: "User register successfully" });
  } catch (error) {
    console.log("Error: Unsuccessfull registration", error);
    return res.status(500).json({ message: "Unsuccessfull Registration" });
  }
});

module.exports = router;
