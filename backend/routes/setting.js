const express = require("express");
const userMiddleWare = require("./user.js");

const router = express.Router();

router.get("/myprofile/edit", userMiddleWare, (req, res) => {
  const user = req.user;
  return res.status(200).json({
    message: "Fetching user details",
    user,
  });
});

module.exports = router;
