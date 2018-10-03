import React, { Component } from 'react';

const UserQuestions = ({ user }) => {
  return (
    <div className="card">
      <strong>Questions</strong>
      {user.questions.length > 0 ? (
        user.questions.map(question => {
          return (
            <div className="card-body" key={question.id}>
              {question.questionTitle}
            </div>
          );
        })
      ) : (
        <div className="card">
          <div className="card-body">
            <div>No Questions</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserQuestions;
