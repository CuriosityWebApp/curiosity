import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAnswer } from '../../queries/queries.js';
import moment from 'moment';

class AnswerItem extends Component {
	displayAnswer() {
		let data = this.props.data;
		if (data && data.loading) {
			return <div>Loading answers...</div>;
		} else {
			return (
				<div className="list-group">
					<div className="list-group-item list-group-item-action flex-column align-items-start">
						<div className="d-flex w-100 justify-content-between">
							<small>
								Answer By {data.answer.user.username} {moment(data.answer.createdAt).fromNow()}
							</small>
							<br />

							<div>
								<small>Rank: {data.answer.user.rank}</small> <br />
								<small>Votes: {data.answer.score}</small>
							</div>
						</div>
						<div className="answerContent">
							<p>{data.answer.answer}</p>
						</div>
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
