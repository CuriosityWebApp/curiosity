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
			let owner = this.props.data.question.user;
			this.props.data.refetch();
			return answers.map(answer => {
				return (
					<AnswerItem
						key={answer.id}
						answerId={answer.id}
						ownerId={owner.id}
						loggedId={this.props.loggedId}
						isPaid={this.props.isPaid}
					/>
				);
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
