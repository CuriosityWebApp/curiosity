import React, { Component } from 'react';
import BuyCredit from '../Payment/BuyCredit.jsx';
import moment from 'moment';

const UserWallet = ({ user }) => {
  return (
    <div>
      <strong>Wallet</strong>
      <div className="card">
        <div className="d-flex w-100 justify-content-between">
          <div>
            <strong>
              Credits:{' '}
              <h3>
                <strong>
                  <em>{user.credit}</em>
                </strong>
              </h3>
            </strong>
          </div>
          <div>
            <BuyCredit id={user.id} username={user.username} />
          </div>
          <div>
            <strong>Redeem Credit</strong>
            <img
              src="https://d1g8y79pdob38v.cloudfront.net/media/catalog/product/p/a/payment-logo_1.png"
              style={{ width: '200px' }}
            />
          </div>
        </div>
      </div>
      <div className="card">
        <strong>Transactions</strong>
        {user.transactions.length > 0 ? (
          user.transactions.map(transaction => {
            return (
              <div className="card-body" key={transaction.id}>
                Question: {transaction.questionName.questionTitle}
                <br />
                Amount: {transaction.amount}
                <br />
                Sender: {transaction.sender.username}
                <br />
                Recipient: {transaction.recipient.username}
              </div>
            );
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
