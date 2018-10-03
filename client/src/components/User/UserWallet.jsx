import React, { Component } from 'react';

const UserWallet = ({ user }) => {
  return (
    <div>
      <strong>Wallet</strong>
      <div className="card">
        <strong>Add Credits</strong>
        <div>
          <img
            src="http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c530.png"
            style={{ width: '200px' }}
          />
          <img
            src="https://cdn1.venmo.com/marketing/images/branding/downloads/venmo_logo_blue.svg"
            style={{ width: '200px' }}
          />
        </div>
      </div>
      <div className="card">
        <strong>Transactions</strong>
        {user.transactions.length > 0 ? (
          user.transaction.map(transaction => {
            return <div className="card-body" key={transaction.id} />;
          })
        ) : (
          <div className="card">
            <div className="card-body">
              <div>No Transactions</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserWallet;
