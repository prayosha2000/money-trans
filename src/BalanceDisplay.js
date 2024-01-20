// BalanceDisplay.js

import React from 'react';
import './BalanceDisplay.css';

const BalanceDisplay = ({ balances }) => {
  return (
    <div className="balance-display-container">
      <h2>Balance Sheet</h2>
      {balances.map((balance) => (
        <div key={balance.userId} className="balance-display-item">
          <p>
            {balance.name} owes {balance.amount < 0 ? 'you' : balance.amount} Rs.
          </p>
        </div>
      ))}
    </div>
  );
};

export default BalanceDisplay;
