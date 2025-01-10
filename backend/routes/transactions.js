const express = require("express");
const Transaction = require("../models/transactions.js");

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, transactionType, amount, category, bill, date } = req.body;
  try {
    const transaction = await Transaction.create({
      title,
      transactionType,
      amount,
      category,
      bill,
      date,
    });
    console.log(transaction);
    return res
      .status(200)
      .json({ message: "Transactions submitted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Transactions unsuccessful" });
  }
});

module.exports = router;
