import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAnswer } from '../../queries/queries.js';
import { AnswerLike, AnswerDislike, UpdatePaid, UpdateCredit, AddTransaction } from '../../mutations/mutations.js';
import moment from 'moment';
import AnswerChoice from './AnswerChoice.jsx';

class AnswerItem extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	IncrementLikes(e) {
		let up, down, data;
		let userId = this.props.userId;
		if (this.props.getAnswer.loading) {
			console.log('still loading');
		} else {
			data = this.props.getAnswer;
			up = new Set(data.answer.ratedUpBy);
			down = new Set(data.answer.ratedDownBy);
			if (up.has(userId)) {
				this.props
					.AnswerLike({
						mutation: AnswerLike,
						variables: {
							id: data.answer.id,
							userId: userId,
							method: 'delete'
						}
					})
					.then(() => {
						this.props.getAnswer.refetch();
					});
			} else if (!up.has(userId) && !down.has(userId)) {
				this.props
					.AnswerLike({
						mutation: AnswerLike,
						variables: {
							id: data.answer.id,
							userId: userId,
							method: 'add'
						}
					})
					.then(() => {
						this.props.getAnswer.refetch();
					});
			}
		}
	}

	decrementLikes(e) {
		let up, down, data;
		let userId = this.props.userId;
		if (this.props.getAnswer.loading) {
			console.log('still loading');
		} else {
			data = this.props.getAnswer;
			up = new Set(data.answer.ratedUpBy);
			down = new Set(data.answer.ratedDownBy);

			if (down.has(userId)) {
				this.props
					.AnswerDislike({
						mutation: AnswerDislike,
						variables: {
							id: data.answer.id,
							userId: userId,
							method: 'delete'
						}
					})
					.then(() => {
						this.props.getAnswer.refetch();
					});
			} else if (!up.has(userId) && !down.has(userId)) {
				this.props
					.AnswerDislike({
						mutation: AnswerDislike,
						variables: {
							id: data.answer.id,
							userId: userId,
							method: 'add'
						}
					})
					.then(() => {
						this.props.getAnswer.refetch();
					});
			}
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
											onClick={this.IncrementLikes.bind(this)}
										/>
									</div>
									<div className="col align-self-start">{data.answer.score}</div>
									<div className="col align-self-start">
										<button
											className="fa fa-caret-down"
											aria-hidden="true"
											style={{ color: 'red', cursor: 'pointer' }}
											onClick={this.decrementLikes.bind(this)}
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
	graphql(AnswerLike, { name: 'AnswerLike' }),
	graphql(AnswerDislike, { name: 'AnswerDislike' }),
	graphql(UpdateCredit, { name: 'UpdateCredit' }),
	graphql(AddTransaction, { name: 'AddTransaction' })
)(AnswerItem);
