// TransactionForm.js

import React, { useState } from 'react';
import './BalanceDisplay.css';
const TransactionForm = ({ users, onExpenseSubmit }) => {
  const [payer, setPayer] = useState('');
  const [amount, setAmount] = useState('');
  const [splitType, setSplitType] = useState('EQUAL');
  const [shares, setShares] = useState([]);

  const handleShareChange = (userId, share) => {
    const updatedShares = [...shares];
    const existingShareIndex = updatedShares.findIndex((s) => s.userId === userId);

    if (existingShareIndex !== -1) {
      updatedShares[existingShareIndex] = { userId, share };
    } else {
      updatedShares.push({ userId, share });
    }

    setShares(updatedShares);
  };

  const handleExpenseSubmitInternal = () => {
    onExpenseSubmit({ payer, amount: parseFloat(amount), splitType, shares });
    setPayer('');
    setAmount('');
    setSplitType('EQUAL');
    setShares([]);
  };

  return (
    <div className="transaction-form">
      <h2>Transaction Form</h2>
      <div>
        <label>Payer:</label>
        <select value={payer} onChange={(e) => setPayer(e.target.value)}>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.userId} value={user.userId}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div>
        <label>Split Type:</label>
        <select value={splitType} onChange={(e) => setSplitType(e.target.value)}>
          <option value="EQUAL">Equal</option>
          <option value="EXACT">Exact</option>
          <option value="PERCENT">Percent</option>
        </select>
      </div>
      {splitType === 'PERCENT' && (
        <div>
          <label>Percentage Shares:</label>
          {users.map((user) => (
            <div key={user.userId}>
              <label>{user.name}:</label>
              <input
                type="number"
                value={shares.find((s) => s.userId === user.userId)?.share || ''}
                onChange={(e) => handleShareChange(user.userId, parseFloat(e.target.value))}
              />
            </div>
          ))}
        </div>
      )}
      <button onClick={handleExpenseSubmitInternal}>Add Transaction</button>
    </div>
  );
};

export default TransactionForm;
