import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BuyCredit from '../Payment/BuyCredit.jsx';
import RedeemCredit from '../Payment/RedeemCredit.jsx';
import moment from 'moment';

const UserWallet = ({ user, data, refetch, notify }) => {
  return (
    <div style={{ marginTop: '50px' }}>
      <div className="card shadow rounded">
        <div className="card-header headerColor text-white leftAlign">
          <i className="fas fa-wallet marigold" /> <strong>Wallet</strong>
        </div>
        <hr className="noMargin" />
        <div className="row">
          <div className="col-12 col-sm-4" style={{ marginTop: '40px' }}>
            <strong>
              Credits{' '}
              <h4>
                <strong>{user.credit}</strong>
              </h4>
            </strong>
          </div>
          <div className="col-12 col-sm-4">
            <BuyCredit
              id={user.id}
              username={user.username}
              data={data}
              refetch={refetch}
              notify={notify}
            />
          </div>
          <div className="col-12 col-sm-4">
            <RedeemCredit />
          </div>
        </div>
      </div>
      <br />
      <div className="card shadow rounded" style={{ marginTop: '35px' }}>
        <div className="card-header leftAlign text-white headerColor">
          <i className="far fa-handshake marigold" /> <strong>Transaction History</strong>
        </div>
        <hr className="noMargin" />
        <div className="well well-sm pre-scrollable" style={{ maxHeight: '30vh' }}>
          {user.transactions.length > 0 ? (
            user.transactions.map(transaction => {
              if (!transaction.questionId) {
                return (
                  <div key={transaction.id}>
                    <div className="card rightLeftMargin borderLineColor">
                      <div className="noMargin leftAlign">
                        <i className="fab fa-cc-stripe" />{' '}
                        <b>{moment(transaction.createAt).format('LL')}</b>
                      </div>

                      <div className="noMargin leftAlign">
                        <div className="noMargin leftAlign">
                          <em>{transaction.transactionMeans}</em>
                          <span style={{ float: 'right' }}>
                            <i
                              className="fas fa-arrow-alt-circle-up"
                              style={{ color: '#28a745' }}
                            />{' '}
                            <b> {transaction.amount}</b> credits
                          </span>
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>
                );
              } else {
                return (
                  <Link
                    to={`/questionContent/${transaction.questionId}`}
                    key={transaction.id}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <div className="card rightLeftMargin borderLineColor">
                      <div className="noMargin leftAlign">
                        <i className="far fa-handshake" />{' '}
                        <b>{moment(transaction.createAt).format('LL')}</b>
                      </div>
                      <div className="noMargin leftAlign">
                        <div style={{ textAlign: 'left' }}>
                          <em>Question:</em>
                          <b> {transaction.transactionMeans}</b>
                          {user.username === transaction.recipient.username ? (
                            <span style={{ float: 'right' }}>
                              <i
                                className="fas fa-arrow-alt-circle-up"
                                style={{ color: '#28a745' }}
                              />{' '}
                              <b> {transaction.amount}</b> credits
                            </span>
                          ) : (
                            <span style={{ float: 'right' }}>
                              <i
                                className="fas fa-arrow-alt-circle-down"
                                style={{ color: '#dc3545' }}
                              />
                              <b> {transaction.amount}</b> credits
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <br />
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
    </div>
  );
};

export default UserWallet;

{
  /* <div className="card" key={id}>
<small>
  <i className="fas fa-comment" /> <b style={{ color: '#14C7F4' }}>{username}</b>{' '}
  asked <b>{questionTitle}</b>
  <span>
    {' '}
    <em>
      {' '}
      - bounty: {question.bounty}{' '}
      {question.bountyPaid ? <em>claimed</em> : <em>not claimed</em>}
    </em>
  </span>
</small>
<hr
  style={{
    padding: '0px',
    margin: '0px',
  }}
/>
<small
  style={{
    padding: '2px',
    margin: '3px',
  }}
>
  Posted {moment(question.createdAt).fromNow()}
  <div>Category: {question.category}</div>
  <div>
    Tags:{' '}
    {question.tags.map((tag, idx) => {
      return <span key={idx}>{tag} </span>;
    })}
  </div>
</small>
<small
  style={{
    padding: '2px',
    margin: '3px',
  }}
>
  Number of Answers: {question.answers.length}
</small>
</div>
<br /> */
}
