import React, { Component } from 'react';

const QuestionItem = ({ postData }) => {
	return (
		<div>
			<li>
				<h2>{postData.questionTitle}</h2>
				<label>Rank: {postData.restriction} </label>
				<br />
				<label>Reward: {postData.bounty}</label>
				<br />
				<label>Answers: {postData.answers.length}</label>
				<br />
				<p>{postData.questionContent}</p>
			</li>
		</div>
	);
};

export default QuestionItem;
