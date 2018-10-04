import React, { Component } from 'react';
import { getQuestion } from '../../queries/queries.js';
import { graphql } from 'react-apollo';

import AnswerItem from './AnswerItem.jsx';

class AnswerList extends Component {
	displayAnswers() {
		if (this.props.data.loading) {
			return <div>Loading...</div>;
		} else {
			let answers = this.props.data.question.answers;
			this.props.data.refetch();
			return answers.map(answer => {
				return <AnswerItem key={answer.id} answerId={answer.id} />;
			});
		}
	}

	render() {
		return <div>{this.displayAnswers()}</div>;
	}
}

export default graphql(getQuestion, {
	options: props => {
		return {
			variables: {
				id: props.id
			}
		};
	}
})(AnswerList);
