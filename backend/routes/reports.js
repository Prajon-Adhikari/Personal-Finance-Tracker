const express = require("express");
const Transaction = require("../models/transactions.js");

const router = express.Router();

router.get("/:yearMonth", async (req, res) => {
  const { yearMonth } = req.params; // e.g., "2024-12"
  try {
    const startDate = new Date(`${yearMonth}-01T00:00:00.000Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);
    endDate.setDate(0); // Set the date to the last day of the previous month (which is the correct last day of the target month)

    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    const transactions = await Transaction.find({
      date: {
        $gte: startDate, // Start of the given month
        $lte: endDate, // Before the start of the next month
      },
    });
    console.log(transactions);
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching transactions" });
  }
});

module.exports = router;
