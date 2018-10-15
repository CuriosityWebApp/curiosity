import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BuyCredit from '../Payment/BuyCredit.jsx';
import RedeemCredit from '../Payment/RedeemCredit.jsx';
import moment from 'moment';

const UserWallet = ({ user, data, refetcher, notify }) => {
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
            <BuyCredit
              id={user.id}
              username={user.username}
              data={data}
              refetcher={refetcher}
              notify={notify}
            />
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
            if (!transaction.questionId) {
              return (
                <div className="card-body" key={transaction.id}>
                  Transaction: {transaction.transactionMeans}
                  <br />
                  Amount: {transaction.amount}
                  <br />
                  Sender: {transaction.sender.username}
                  <br />
                  Recipient: {transaction.recipient.username}
                </div>
              );
            } else {
              return (
                <Link
                  to={`/questionContent/${transaction.questionId}`}
                  key={transaction.id}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <div className="card-body">
                    Transaction: {transaction.transactionMeans}
                    <br />
                    Amount: {transaction.amount}
                    <br />
                    Sender: {transaction.sender.username}
                    <br />
                    Recipient: {transaction.recipient.username}
                  </div>
                </Link>
              );
            }
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
