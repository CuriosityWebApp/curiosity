import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAnswer } from '../../queries/queries.js';
import { UpdateAnswerLikes } from '../../mutations/mutations.js';
import moment from 'moment';
import AnswerChoice from './AnswerChoice.jsx';

class AnswerItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			clicked: null
		};
		this.UpdateLikes = this.UpdateLikes.bind(this);
	}

	UpdateLikes(e) {
		if (e.target.value > 0 && (this.state.clicked === null || this.state.clicked === 'down')) {

			this.props
				.UpdateAnswerLikes({
					variables: {
						userId: this.props.getAnswer.answer.user.id,
						answerId: this.props.answerId,
						score: 1
					}
				})
				.then(data => {
					this.setState({ clicked: 'up' });
				});
		} else if (e.target.value < 0 && (this.state.clicked === null || this.state.clicked === 'up')) {
			this.props
				.UpdateAnswerLikes({
					variables: {
						userId: this.props.getAnswer.answer.user.id,
						answerId: this.props.answerId,
						score: -1
					}
				})
				.then(() => this.setState({ clicked: 'down' }));
		} else {
			alert('You cannot add multiple likes/dislikes to 1 answer!');
		}
	}

	displayAnswer() {
		let data = this.props.getAnswer;
		if (data && data.loading) {
			return <div>Loading answers...</div>;
		} else {
			return (
				<div className="list-group">
					<div className="list-group-item list-group-item-action flex-column align-items-start">
						<div className="row">
							<div className="col-1">
								<div className="row" style={{ textAlign: 'right' }}>
									<div className="col align-self-start">
										<button
											className="fa fa-caret-up"
											aria-hidden="true"
											style={{ color: 'green', cursor: 'pointer' }}
											value={1}
											onClick={this.UpdateLikes}
										/>
									</div>
									<div className="col align-self-start">{data.answer.score}</div>
									<div className="col align-self-start">
										<button
											className="fa fa-caret-down"
											aria-hidden="true"
											style={{ color: 'red', cursor: 'pointer' }}
											value={-1}
											onClick={this.UpdateLikes}
										/>
									</div>
								</div>
							</div>
							<div className="col-11">
								<div className="d-flex w-100 justify-content-between">
									<div>
										<small>
											Answer By {data.answer.user.username}{' '}
											{moment(data.answer.createdAt).fromNow()}
										</small>
										<br />
										<AnswerChoice 
										  questionId={this.props.questionId} 
									  	bounty={this.props.bounty} 
									  	ownerId={this.props.ownerId}
											answerId={this.props.answerId}
											loggedId={this.props.loggedId}
											isPaid={this.props.isPaid}
										/>
									</div>
									<div>
										<small>Rank: {data.answer.user.rank}</small> <br />
										<small>Votes: {data.answer.score}</small>
									</div>
								</div>
								<br />
								<div className="answerContent">
									<p>{data.answer.answer}</p>
								</div>
							</div>
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

export default compose(
	graphql(getAnswer, {
		name: 'getAnswer',
		options: props => {
			return {
				variables: {
					id: props.answerId
				}
			};
		}
	}),
	graphql(UpdateAnswerLikes, { name: 'UpdateAnswerLikes' }),
)(AnswerItem);