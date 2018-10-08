import React, { Component } from 'react';
import { getQuestion } from '../../queries/queries.js';
import { graphql } from 'react-apollo';

import AnswerItem from './AnswerItem.jsx';

class AnswerList extends Component {

	displayBestAnswer() {
		if (this.props.data.loading) {
			return <div>Loading...</div>;
		} else {
			let answers = this.props.data.question.answers;
			let user = this.props.data.question.user;
			return answers.map(answer => {
				if (answer.answerChosen) {
					console.log(answer, "WTF")
					return (
				  	<AnswerItem
				  		key={answer.id}
				  		answerId={answer.id}
				  		userId={user.id}
				  		loggedId={this.props.loggedId}
				  		isPaid={this.props.isPaid}
				  		questionId={this.props.id}
				  		bounty={this.props.bounty}
				  	/>
				  );
				} else {
					return null;
				}
			});
		}
	}

	displayAnswers() {
		if (this.props.data.loading) {
			return <div>Loading...</div>;
		} else {
			let answers = this.props.data.question.answers;
			let user = this.props.data.question.user;
			this.props.data.refetch();
			return answers.map(answer => {
				if (!answer.answerChosen) {
				  return (
				  	<AnswerItem
				  		key={answer.id}
				  		answerId={answer.id}
				  		userId={user.id}
				  		loggedId={this.props.loggedId}
				  		isPaid={this.props.isPaid}
				  		questionId={this.props.id}
				  		bounty={this.props.bounty}
				  	/>
				  );
				}
			});
		}
	}
	render() {
		return (
			<div>
				<div>{this.displayBestAnswer()}</div>
				<div>{this.displayAnswers()}</div>
			</div>
		)
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
