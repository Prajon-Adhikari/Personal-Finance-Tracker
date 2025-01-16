const express = require("express");
const Transaction = require("../models/transactions.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const today = new Date();
    const currentYear = today.getFullYear(); // Get the current year
    const startOfYear = new Date(currentYear, 0, 1); // January 1st, current year
    const endOfYear = new Date(currentYear + 1, 0, 1);
    const recentTransactions = await Transaction.find({})
      .sort({ createdAt: -1 })
      .limit(5);
    const transactions = await Transaction.find({
      date: { $gte: startOfYear, $lt: endOfYear },
    });
    return res.status(200).json({ recentTransactions, transactions });
  } catch (error) {
    return res.status(500).json({ message: "Error on transactions" });
  }
});

module.exports = router;
