// ExpenseForm.js

import React, { useState } from 'react';
import './ExpenseForm.css';

const ExpenseForm = ({ users, onExpenseSubmit }) => {
  const [payer, setPayer] = useState('');
  const [amount, setAmount] = useState(0);
  const [splitType, setSplitType] = useState('EQUAL');
  const [shares, setShares] = useState([]);

  const handleShareChange = (userId, share) => {
    const updatedShares = [...shares];
    const index = updatedShares.findIndex((s) => s.userId === userId);
    if (index !== -1) {
      updatedShares[index].share = share;
    } else {
      updatedShares.push({ userId, share });
    }
    setShares(updatedShares);
  };

  const handleSubmit = () => {
    onExpenseSubmit({ payer, amount, splitType, shares });
    // Reset form after submitting
    setPayer('');
    setAmount(0);
    setSplitType('EQUAL');
    setShares([]);
  };

  return (
    <div className="expense-form-container">
      <label className="expense-form-label">Payer:</label>
      <select className="expense-form-input" value={payer} onChange={(e) => setPayer(e.target.value)}>
        {users.map((user) => (
          <option key={user.userId} value={user.userId}>
            {user.name}
          </option>
        ))}
      </select>

      <label className="expense-form-label">Amount:</label>
      <input className="expense-form-input" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />

      <label className="expense-form-label">Split Type:</label>
      <select className="expense-form-input" value={splitType} onChange={(e) => setSplitType(e.target.value)}>
        <option value="EQUAL">Equal</option>
        <option value="EXACT">Exact</option>
        <option value="PERCENT">Percent</option>
      </select>

      {splitType === 'PERCENT' && (
        <div>
          {users.map((user) => (
            <div key={user.userId}>
              <label className="expense-form-label">{user.name}'s Percent Share:</label>
              <input
                className="expense-form-input"
                type="number"
                value={shares.find((s) => s.userId === user.userId)?.share || 0}
                onChange={(e) => handleShareChange(user.userId, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      <button className="expense-form-button" onClick={handleSubmit}>
        Submit Expense
      </button>
    </div>
  );
};

export default ExpenseForm;
