import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { getQuestion } from '../../queries/queries.js';
import AnswerList from '../Answer/AnswerList.jsx';

class QuestionContent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Query query={getQuestion} variables={{ id: this.props.id }}>
				{({ loading, error, data }) => {
					if (loading) {
						return <p>Loading...</p>;
					}
					if (error) {
						return <p>Error! ${error}</p>;
					} else {
						return (
							<div>
								<div>{data.question.questionTitle}</div>
								<div>{data.question.questionContent}</div>
								<div>{data.question.category}</div>
								<div>{data.question.bounty}</div>
								<AnswerList id={this.props.id} />
							</div>
						);
					}
				}}
			</Query>
		);
	}
}

export default QuestionContent;
