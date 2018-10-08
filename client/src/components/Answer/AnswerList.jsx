import React, { Component } from 'react';
import { getQuestion } from '../../queries/queries.js';
import { graphql } from 'react-apollo';

import AnswerItem from './AnswerItem.jsx';
import ChosenAnswer from './ChosenAnswer.jsx';

class AnswerList extends Component {
	displayAnswers() {
		if (this.props.data.loading) {
			return <div>Loading...</div>;
		} else {
			let answers = this.props.data.question.answers;
			let owner = this.props.data.question.user
			this.props.data.refetch();
			// console.log("I AM ANSWERS FROM THE LIST", this.props.data.question)
			return answers.map(answer => {
				if (answer.answerChosen) {
					return <ChosenAnswer key={answer.id} id={answer.id}/>
				} else {
					return <AnswerItem 
					key={answer.id} 
					answerId={answer.id}
					ownerId={owner.id}
					isPaid={this.props.isPaid}
					bounty={this.props.bounty}
					loggedId={this.props.loggedId} 
					questionId={this.props.id} 
					/>;
				}
			});
		}
	}
	render() {
		return (
			<div>
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
