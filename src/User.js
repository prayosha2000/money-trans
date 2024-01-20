// User.js

import React from 'react';
import './User.css';

const User = ({ user }) => {
  return (
    <div className="user-container">
      <p>{user.name}</p>
      <p className="user-balance">Balance: {user.balance.toFixed(2)} Rs.</p>
    </div>
  );
};

export default User;
