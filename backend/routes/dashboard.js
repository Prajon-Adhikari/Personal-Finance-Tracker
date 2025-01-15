const express = require("express");
const Transaction = require("../models/transactions.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find({})
      .sort({ createdAt: -1 })
      .limit(5);
    return res.status(200).json({ transactions });
  } catch (error) {
    return res.status(500).json({ message: "Error on transactions" });
  }
});

module.exports = router;
