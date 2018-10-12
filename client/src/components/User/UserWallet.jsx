import React, { Component } from 'react';
import BuyCredit from '../Payment/BuyCredit.jsx';
import RedeemCredit from '../Payment/RedeemCredit.jsx';
import moment from 'moment';

const UserWallet = ({ user, data, refetcher }) => {
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
            <BuyCredit id={user.id} username={user.username} data={data} refetcher={refetcher} />
          </div>
          <div>
            <RedeemCredit />
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
