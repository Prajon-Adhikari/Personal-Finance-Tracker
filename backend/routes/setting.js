const express = require("express");
const { verifyToken } = require("./user.js");

const router = express.Router();

router.get("/myprofile", verifyToken, (req, res) => {
  const user = req.user;
  return res.status(200).json({
    message: "Fetching personal details",
    user,
  });
});

router.get("/myprofile/edit", verifyToken, (req, res) => {
  const user = req.user;
  return res.status(200).json({
    message: "Fetching personal details",
    user,
  });
});

module.exports = router;
