import React, { Component } from 'react';
import moment from 'moment';

const UserQuestions = ({ questions }) => {
	// bounty: 30;
	// bountyPaid: false;
	// createdAt: '2018-10-01T21:09:56.180Z';
	// id: '5bb28d241723602d90864b76';
	return (
		<div className="card">
			<strong>Questions</strong>
			{questions.length > 0 ? (
				questions.map(question => {
					return (
						<div className="card-body" key={question.id}>
							Title: {question.questionTitle}
							<br />
							CreatedAt: {moment(question.createdAt).fromNow()}
							<br />
							Bounty: {question.bounty}
							Paid?: {question.bountyPaid}
							<br />
							questionId: {question.id}
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
