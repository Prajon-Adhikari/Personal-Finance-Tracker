const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    bill: {
      type: Buffer,
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = Transaction;
