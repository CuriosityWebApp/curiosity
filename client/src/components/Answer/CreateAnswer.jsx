import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { AddAnswer } from '../../mutations/mutations.js';

class CreateAnswer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			answerContent: null
		};
	}
	submitAnswer(e) {
		// e.preventDefault();
		console.log('Data from state', this.state.answerContent, this.props.userId, this.props.questionId);
		this.state.answerContent
			? this.props
					.mutate({
						mutation: AddAnswer,
						variables: {
							userId: this.props.userId,
							questionId: this.props.questionId,
							answer: this.state.answerContent
						}
					})
					.then(({ data }) => refetchQueries)
					.catch(err => console.log('Error', err))
			: alert('Please write your answer before sending it');
	}
	render() {
		return (
			<div className="answerForm">
				<form>
					<label>Write the answer below: </label>
					<br />
					<textarea
						rows="10"
						cols="80"
						value={this.state.answerContent}
						onChange={e => this.setState({ answerContent: e.target.value })}
					/>
				</form>
				<button onClick={this.submitAnswer.bind(this)}>Send response</button>
			</div>
		);
	}
}

export default graphql(AddAnswer)(CreateAnswer);
