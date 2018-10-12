import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getQuestion } from '../../queries/queries.js';
import AnswerList from '../Answer/AnswerList.jsx';
import moment from 'moment';
import CreateAnswer from '../Answer/CreateAnswer.jsx';

class QuestionContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			answerClicked: false,
			rerender: false
		};
	}
	forceRender() {
		this.setState({ rerender: !this.state.rerender });
	}
	displayQuestionContent() {
		let data = this.props.data;
		if (data && data.loading) {
			return <div> Loading...</div>;
		}
		if (data.error) {
			return <div>Error...</div>;
		} else {
			return (
				<div className="list-group">
					<div className="list-group-item list-group-item-action flex-column align-items-start">
						<div className="d-flex w-100 justify-content-between">
							<h3 className="mb-1">{data.question.questionTitle}</h3>
							<div>
								<small>Bounty: {data.question.bounty}</small>
								<br />
								<small>Category: {data.question.category}</small>
							</div>
						</div>
						<small>
							Posted By {data.question.user.username} {moment(data.question.createdAt).fromNow()}
						</small>
						<div>
							<br />
							<div>{data.question.questionContent}</div>
						</div>
					</div>
					<AnswerList
						id={this.props.id}
						qOwnerId={data.question.user.id}
						loggedId={this.props.loggedId}
						isPaid={data.question.bountyPaid}
						bounty={data.question.bounty}
						userId={this.props.user.id}
						questionId={this.props.id}
						signedIn={this.props.user.signedIn}
					/>
				</div>
			);
		}
	}
	render() {
		return this.displayQuestionContent();
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
})(QuestionContent);
