const express = require("express");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

const router = express.Router();

const secretKey = "mySecretKey";

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        fullName: user.fullName,
        mobile: user.mobile,
        bio: user.bio,
        country: user.country,
        city: user.city,
        postalCode: user.postalCode,
        email: user.email,
        profilePic: user.profilePic,
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      message: "Sign In successfully",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json("Error:", error);
  }
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password, mobile } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      mobile,
    });

    const token = jwt.sign(
      {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
      },
      secretKey,
      { expiresIn: "1h" }
    );

    console.log(user);
    return res
      .status(200)
      .json({ message: "User register successfully", token, user });
  } catch (error) {
    console.log("Error: Unsuccessfull registration", error);
    return res.status(500).json({ message: "Unsuccessfull Registration" });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Invalid or expired token" });
  }
};

module.exports = { router, verifyToken };
