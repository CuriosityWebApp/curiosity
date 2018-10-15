import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import { getAnswer } from '../../queries/queries.js';
import { AnswerLike, AnswerDislike, UpdateCredit, AddTransaction, AddMessage } from '../../mutations/mutations.js';
import ProfileSmallPage from '../PublicProfile/ProfileSmallPage.jsx';
import moment from 'moment';
import AnswerChoice from './AnswerChoice.jsx';
import _ from 'lodash';
import ReactTooltip from 'react-tooltip';

class AnswerItem extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.report = this.report.bind(this);
		this.throttledIcrement = _.throttle(this.IncrementLikes, 200, { leading: false });
		this.throttledDecrement = _.throttle(this.decrementLikes, 200, { leading: false });
	}

	IncrementLikes(e) {
		if (!this.props.loggedId) {
			alert('You must log in first!');
		} else {
			let up, down, data;
			let userId = this.props.loggedId;
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
	}

	decrementLikes(e) {
		if (!this.props.loggedId) {
			alert('You must log in first!');
		} else {
			let up, down, data;
			let userId = this.props.loggedId;
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
	}

	displayAnswer() {
		if (this.props.getAnswer && this.props.getAnswer.loading) {
			return <div>Loading answers...</div>;
		} else {
			let data = this.props.getAnswer;
			let hoverText = `Likes: ${this.props.getAnswer.answer.ratedUpBy.length}, Dislikes: ${
				this.props.getAnswer.answer.ratedDownBy.length
			}`;
			return (
				<React.Fragment>
					<div className="list-group">
						<div className="list-group-item">
							<div className="row">
								<div className="col-1">
									<div>
										<br />
										<br />
										<br />
										<br />
										<button
											className="fas fa-angle-up fa-2x centerAlign arrowUp"
											aria-hidden="true"
											style={{
												color: 'green',
												cursor: 'pointer',
												display: 'block',
												marginLeft: 'auto',
												marginRight: 'auto',
												border: 'none',
												background: 'none'
											}}
											onClick={this.throttledIcrement.bind(this)}
										/>
									</div>
									<div
										style={{
											textAlign: 'center'
										}}
									>
										<ReactTooltip effect="solid" />
										<p data-tip={hoverText}>{data.answer.score}</p>
									</div>
									<div>
										<button
											className="fas fa-angle-down fa-2x"
											aria-hidden="true"
											style={{
												color: 'red',
												cursor: 'pointer',
												display: 'block',
												marginLeft: 'auto',
												marginRight: 'auto',
												border: 'none',
												background: 'none'
											}}
											onClick={this.throttledDecrement.bind(this)}
										/>
									</div>
								</div>
								<div className="col-2">
									<Link
										to={`/user/${data.answer.user.id}`}
										style={{ textDecoration: 'none', color: 'black' }}
									>
										<div>
											<ProfileSmallPage userId={data.answer.user.id} />
										</div>
									</Link>
								</div>
								<div />
								<div className="col-9">
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
												qOwnerId={this.props.qOwnerId}
												answerId={this.props.answerId}
												loggedId={this.props.loggedId}
												isPaid={this.props.isPaid}
												refetch={this.props.refetch}
											/>
										</div>
										<div>
											<small>Rank: {data.answer.user.rank}</small> <br />
											<small>Votes: {data.answer.score}</small> <br />
											<button
												type="button"
												className="btn btn-danger btn-sm"
												onClick={this.report}
											>
												Report
											</button>
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
				</React.Fragment>
			);
		}
	}
	report() {
		console.log('this are the props', this.props.data);
		let messageTitle = 'REPORT: AnswerId:' + this.props.answerId;
		let messageContent =
			'User: ' +
			this.props.getAnswer.answer.user.username +
			'\nQuestionTitle: ' +
			this.props.data.question.questionTitle;
		this.props.AddMessage({
			mutation: AddMessage,
			variables: {
				senderId: this.props.loggedId,
				receiverId: '5bb8d00baf90e323e4b9c8a9',
				messageTitle: messageTitle,
				messageContent: messageContent
			}
		});
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
	graphql(AddTransaction, { name: 'AddTransaction' }),
	graphql(AddMessage, { name: 'AddMessage' })
)(AnswerItem);
