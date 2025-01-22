const express = require("express");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

const router = express.Router();

const secretKey = "mySecretKey";

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
    const user = await User.create({
      fullName,
      email,
      password,
      mobile,
    });
    console.log(user);
    return res
      .status(200)
      .json({ message: "User register successfully", token });
  } catch (error) {
    console.log("Error: Unsuccessfull registration", error);
    return res.status(500).json({ message: "Unsuccessfull Registration" });
  }
});

const verifyToken = (req, res, next) => {
  console.log(req.headers);
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
