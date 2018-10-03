import React, { Component } from 'react';

const UserAnswers = ({ user }) => {
  return (
    <div className="card">
      <strong>Answers</strong>
      {user.answers.length > 0 ? (
        user.answers.map(answer => {
          return (
            <div className="card-body" key={answer.id}>
              {answer.answer}
            </div>
          );
        })
      ) : (
        <div className="card">
          <div className="card-body">
            <div>No Answers</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAnswers;
