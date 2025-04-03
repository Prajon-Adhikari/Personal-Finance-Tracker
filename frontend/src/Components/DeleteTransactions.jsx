import React, { useState } from "react";

export default function DeleteTransactions({
  transaction,
  selectedMonth,
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState(transaction || {});

  const [date, setDate] = useState(formData.date.slice(0, 10));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!transaction?._id) {
      console.error("Transaction ID is missing!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/menu/transactions/${selectedMonth}/${transaction._id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete transactions");
      }

      console.log("Transaction deleted successfully");
      onSave();
      onClose();
    } catch (error) {
      console.log("Error on deleting transaction : ", error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-10 rounded-lg w-[400px]">
        <form onSubmit={handleSubmit}>
          <h1 className="text-xl font-semibold border-b-2 pb-3">
            Delete Transaction
          </h1>
          <div className="mb-3 pt-4">
            <label className="block text-gray-600">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title || ""}
              className="w-full p-2 border rounded-md"
              disabled
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-600">Amount</label>
            <input
              type="text"
              name="amount"
              value={formData.amount || ""}
              className="w-full p-2 border rounded-md"
              disabled
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-600">Date</label>
            <input
              type="text"
              name="date"
              value={date || ""}
              className="w-full p-2 border rounded-md"
              disabled
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="bg-gray-400 px-4 py-2 rounded-md text-white"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-500 px-4 py-2 rounded-md text-white"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
