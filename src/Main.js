// Main.js

import React, { useState } from 'react';
import User from './User';
import ExpenseForm from './ExpenseForm';
import BalanceDisplay from './BalanceDisplay';
import './Main.css';

const Main = () => {
  const [users, setUsers] = useState([
    { userId: 'u1', name: 'User1', balance: 0 },
    { userId: 'u2', name: 'User2', balance: 0 },
    { userId: 'u3', name: 'User3', balance: 0 },
    { userId: 'u4', name: 'User4', balance: 0 },
  ]);

  const [expenses, setExpenses] = useState([]);
  const [balances, setBalances] = useState([]);

  const handleExpenseSubmit = ({ payer, amount, splitType, shares }) => {
    const updatedUsers = users.map((user) => {
      const share = shares.find((s) => s.userId === user.userId)?.share || 0;
      let shareAmount = 0;

      switch (splitType) {
        case 'EQUAL':
          shareAmount = distributeEqually(amount, users.length);
          break;
        case 'EXACT':
          shareAmount = share;
          break;
        case 'PERCENT':
          shareAmount = (share / 100) * amount;
          break;
        default:
          break;
      }

      return {
        ...user,
        balance: user.userId === payer ? user.balance + amount - shareAmount : user.balance - shareAmount,
      };
    });

    setUsers(updatedUsers);

    setExpenses([...expenses, { payer, amount, splitType, shares }]);

    const calculatedBalances = updatedUsers
      .filter((user) => user.balance !== 0)
      .map((user) => ({ userId: user.userId, name: user.name, amount: user.balance.toFixed(2) }));

    setBalances(calculatedBalances);
  };

  const distributeEqually = (amount, numUsers) => {
    const shareAmount = Math.floor((amount / numUsers) * 100) / 100;
    const remainingAmount = amount - shareAmount * numUsers;
    return shareAmount + remainingAmount;
  };

  const handleShowBalances = () => {
    const nonZeroBalances = users.filter((user) => user.balance !== 0);
    const calculatedBalances = nonZeroBalances.map((user) => ({
      userId: user.userId,
      name: user.name,
      amount: user.balance.toFixed(2),
    }));
    setBalances(calculatedBalances);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary">Expense Sharing App</h1>
      <div className="row">
        {users.map((user) => (
          <div key={user.userId} className="col-md-3">
            <User user={user} />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <ExpenseForm users={users} onExpenseSubmit={handleExpenseSubmit} />
        <button className="btn btn-primary mt-3" onClick={handleShowBalances}>
          Show Balances
        </button>
        <BalanceDisplay balances={balances} />
      </div>
    </div>
  );
};

export default Main;
