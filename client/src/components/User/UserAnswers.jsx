import React, { Component } from 'react';
import moment from 'moment';

const UserAnswers = ({ answers }) => {
  return (
    <div className="card">
      <strong>Answers</strong>
      {answers.length > 0 ? (
        answers.map(answer => {
          return (
            <div className="card-body" key={answer.id}>
              Answer: {answer.answer}
              <br />
              Score: {answer.score}
              <br />
              CreatedAt: {moment(answer.createdAt).fromNow()}
              <br />
              questionId: {answer.questionId}
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
