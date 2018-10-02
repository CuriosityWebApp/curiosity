import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAnswer } from '../../queries/queries.js';

class AnswerItem extends Component {
	displayAnswer() {
		let data = this.props.data;
		if (data && data.loading) {
			return <div>Loading answers...</div>;
		} else {
			return (
				<div className="answerContainer">
					<div className="userInfoBox">
						<label>{data.answer.user.username}</label> <br />
						<label>Rank: {data.answer.user.rank}</label>
					</div>
					<div className="answerContent">
						<p>{data.answer.answer}</p>
					</div>
				</div>
			);
		}
	}

	render() {
		return <div>{this.displayAnswer()}</div>;
	}
}

export default graphql(getAnswer, {
	options: props => {
		return {
			variables: {
				id: props.answerId
			}
		};
	}
})(AnswerItem);
