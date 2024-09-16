import React, { useState, useEffect } from "react";
import "./styles.css";
function App() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(savedExpenses);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = () => {
    if (!description || !amount || !date) {
      alert("All fields are required.");
      return;
    }

    const newExpense = { description, amount, date };
    if (editIndex !== null) {
      const updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = newExpense;
      setExpenses(updatedExpenses);
      setEditIndex(null);
    } else {
      setExpenses([...expenses, newExpense]);
    }
    setDescription("");
    setAmount("");
    setDate("");
  };

  const handleEditExpense = (index) => {
    setDescription(expenses[index].description);
    setAmount(expenses[index].amount);
    setDate(expenses[index].date);
    setEditIndex(index);
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const totalAmount = expenses
    .reduce((total, expense) => total + parseFloat(expense.amount || 0), 0)
    .toFixed(2);

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleAddExpense}>
          {editIndex !== null ? "Update Expense" : "Add Expense"}
        </button>
      </div>
      <div className="expenses-list">
        <h2>Expenses</h2>
        {sortedExpenses.length === 0 ? (
          <p>No expenses to display</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedExpenses.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.description}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.date}</td>
                  <td>
                    <button onClick={() => handleEditExpense(index)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteExpense(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="total">
          <strong>Total: RS:- {totalAmount}</strong>
        </div>
      </div>
    </div>
  );
}

export default App;
