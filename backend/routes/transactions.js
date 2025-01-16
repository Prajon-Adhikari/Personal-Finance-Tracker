const express = require("express");
const Transaction = require("../models/transactions.js");

const router = express.Router();

router.get("/:yearMonth", async (req, res) => {
  const { yearMonth } = req.params;
  try {
    const startDate = new Date(`${yearMonth}-01T00:00:00.000Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);
    endDate.setDate(0); // Set the date to the last day of the previous month (which is the correct last day of the target month)

    const transactions = await Transaction.find({
      date: {
        $gte: startDate, // Start of the given month
        $lte: endDate, // Before the start of the next month
      },
    });
    return res.status(200).json({ transactions });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching transactions" });
  }
});

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
