import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAnswer } from '../../queries/queries.js';
import { AnswerLike, AnswerDislike, UpdatePaid, UpdateCredit, AddTransaction } from '../../mutations/mutations.js';
import moment from 'moment';

class AnswerItem extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	IncrementLikes(e) {
		let up, down, data;
		if (this.props.getAnswer.loading) {
			console.log('still loading');
		} else {
			console.log('this is props', this.props.getAnswer);
			data = this.props.getAnswer;
			up = new Set(data.answer.ratedUpBy);
			down = new Set(data.answer.ratedDownBy);

			if (up.has(this.props.userId)) {
				alert("Can't like it more than once");
			} else if (up.has(this.props.userId) === false && down.has(this.props.userId) === true) {
				console.log('inside of first else if at like', up, down);
				console.log('result of up and down : >> ', up.has(this.props.userId), down.has(this.props.userId));
				this.props
					.AnswerLike({
						mutation: AnswerLike,
						variables: {
							id: data.answer.id,
							userId: this.props.userId,
							method: 'add'
						}
					})
					.then(() => {
						this.props.getAnswer.refetch();
					})
					.then(() => {
						console.log('inside of first else if of likes at dislike', up, down);
						this.props.AnswerDislike({
							mutation: AnswerDislike,
							variables: {
								id: data.answer.id,
								userId: this.props.userId,
								method: 'delete'
							}
						});
					});
			} else if (up.has(this.props.userId) === false && down.has(this.props.userId) === false) {
				console.log('inside of both false likes');
				this.props
					.AnswerLike({
						mutation: AnswerLike,
						variables: {
							id: data.answer.id,
							userId: this.props.userId,
							method: 'add'
						}
					})
					.then(() => {
						this.props.getAnswer.refetch();
					});
			}
		}
		console.log('at the end', up, down);
	}

	decrementLikes(e) {
		let up, down, data;
		if (this.props.getAnswer.loading) {
			console.log('still loading');
		} else {
			data = this.props.getAnswer;
			up = new Set(data.answer.ratedUpBy);
			down = new Set(data.answer.ratedDownBy);

			if (down.has(this.props.userId)) {
				alert("Can't dislike it more than once");
			} else if (down.has(this.props.userId) === false && up.has(this.props.userId) === true) {
				console.log('inside first else if of dislikes', up, down);
				this.props
					.AnswerDislike({
						mutation: AnswerDislike,
						variables: {
							id: data.answer.id,
							userId: this.props.userId,
							method: 'add'
						}
					})
					.then(() => {
						this.props.getAnswer.refetch();
					})
					.then(() => {
						console.log('inside of like in decrement', up, down);
						this.props.AnswerLike({
							mutation: AnswerLike,
							variables: {
								id: data.answer.id,
								userId: this.props.userId,
								method: 'delete'
							}
						});
					});
			} else if (up.has(this.props.userId) === false && down.has(this.props.userId) === false) {
				console.log('inside of both false in decrement', up, down);
				this.props
					.AnswerDislike({
						mutation: AnswerLike,
						variables: {
							id: data.answer.id,
							userId: this.props.userId,
							method: 'add'
						}
					})
					.then(() => {
						this.props.getAnswer.refetch();
					});
			}
		}
		console.log('at the end of decrement,', up, down);
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
											onClick={this.IncrementLikes.bind(this)}
										/>
									</div>
									<div className="col align-self-start">{data.answer.score}</div>
									<div className="col align-self-start">
										<button
											className="fa fa-caret-down"
											aria-hidden="true"
											style={{ color: 'red', cursor: 'pointer' }}
											value={-1}
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
