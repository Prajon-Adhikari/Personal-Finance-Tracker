const express = require("express");
const { verifyToken } = require("./user.js");
const User = require("../models/user.js");
const multer = require("multer");
const path = require("path");

const router = express.Router();

router.get("/myprofile", verifyToken, (req, res) => {
  const user = req.user;
  return res.status(200).json({
    message: "Fetching personal details",
    user,
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/myprofile/edit", verifyToken, (req, res) => {
  const user = req.user;
  return res.status(200).json({
    message: "Fetching personal details",
    user,
  });
});

router.post(
  "/myprofile/edit",
  upload.single("image"),
  verifyToken,
  async (req, res) => {
    console.log("Received request body:", req.body);

    try {
      const { fullName, mobile, bio, country, city, postalCode } = req.body;

      const updateFields = {};
      if (fullName) updateFields.fullName = fullName;
      if (mobile) updateFields.mobile = mobile;
      if (bio) updateFields.bio = bio;
      if (country) updateFields.country = country;
      if (city) updateFields.city = city;
      if (postalCode) updateFields.postalCode = postalCode;
      if (req.file) updateFields.profilePic = `${req.file.filename}`;


      const updatedUser = await User.findOneAndUpdate(
        { email: req.user.email },
        {
          $set: updateFields,
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res
        .status(200)
        .json({ message: "Updated successfully", user: updatedUser });
    } catch (error) {
      return res.status(400).json({ message: "Update unsuccessfull" });
    }
  }
);

module.exports = router;
