import React, { useState, useEffect } from "react";

export default function EditTransaction({
  transaction,
  selectedMonth,
  onClose,
  onSave,
}) {
  // Ensure formData is correctly initialized
  const [formData, setFormData] = useState(transaction || {});

  // Update formData when transaction prop changes
  useEffect(() => {
    if (transaction) {
      setFormData(transaction);
    }
  }, [transaction]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if transaction ID exists
    if (!transaction?._id) {
      console.error("Transaction ID is missing!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/menu/transactions/${selectedMonth}/${transaction._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        console.error("Failed to update transaction");
        return;
      }

      onSave(); // Refresh transaction list
      onClose(); // Close modal
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Edit Transaction</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-600">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-600">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-600">Category</label>
            <select
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Electricity">Electricity</option>
              <option value="Salary">Salary</option>
              <option value="Charity">Charity</option>
              <option value="Health">Health</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="bg-gray-400 px-4 py-2 rounded-md text-white"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded-md text-white"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
