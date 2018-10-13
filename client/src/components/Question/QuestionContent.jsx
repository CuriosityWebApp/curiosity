import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getQuestion } from '../../queries/queries.js';
import { QuestionLike, QuestionDislike } from '../../mutations/mutations.js';

import { Link } from 'react-router-dom';
import AnswerList from '../Answer/AnswerList.jsx';
import moment from 'moment';
import ProfileSmallPage from '../PublicProfile/ProfileSmallPage.jsx';
import _ from 'lodash';
import ReactTooltip from 'react-tooltip';

class QuestionContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			answerClicked: false
			// rerender: false
		};
		this.IncrementLikes = this.IncrementLikes.bind(this);
		this.decrementLikes = this.decrementLikes.bind(this);
		this.throttledIcrement = _.throttle(this.IncrementLikes, 200, { leading: false }).bind(this);
		this.throttledDecrement = _.throttle(this.decrementLikes, 200, { leading: false }).bind(this);
	}
	// forceRender() {
	// 	this.setState({ rerender: !this.state.rerender });
	// }

	IncrementLikes(e) {
		if (!this.props.loggedId) {
			alert('You must log in first!');
		} else {
			let up, down, data;
			let userId = this.props.loggedId;

			if (this.props.data.loading) {
				console.log('loading questions..');
			} else {
				data = this.props.data.question;
				up = new Set(data.ratedUpBy);
				down = new Set(data.ratedDownBy);
				if (up.has(userId)) {
					this.props
						.QuestionLike({
							mutation: QuestionLike,
							variables: {
								id: data.id,
								userId: userId,
								method: 'delete'
							}
						})
						.then(() => {
							this.props.data.refetch();
						});
				} else if (!up.has(userId) && !down.has(userId)) {
					this.props
						.QuestionLike({
							mutation: QuestionLike,
							variables: {
								id: data.id,
								userId: userId,
								method: 'add'
							}
						})
						.then(() => {
							this.props.data.refetch();
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

			if (this.props.data.loading) {
				console.log('loading questions..');
			} else {
				data = this.props.data.question;
				up = new Set(data.ratedUpBy);
				down = new Set(data.ratedDownBy);
				if (down.has(userId)) {
					this.props
						.QuestionDislike({
							mutation: QuestionDislike,
							variables: {
								id: data.id,
								userId: userId,
								method: 'delete'
							}
						})
						.then(() => {
							this.props.data.refetch();
						});
				} else if (!up.has(userId) && !down.has(userId)) {
					this.props
						.QuestionDislike({
							mutation: QuestionDislike,
							variables: {
								id: data.id,
								userId: userId,
								method: 'add'
							}
						})
						.then(() => {
							this.props.data.refetch();
						});
				}
			}
		}
	}

	displayQuestionContent() {
		if (this.props.data && this.props.data.loading) {
			return <div> Loading...</div>;
		}
		if (this.props.data.error) {
			return <div>Error...</div>;
		} else {
			let data = this.props.data;
			let hoverText = `Likes: ${this.props.data.question.ratedUpBy.length}, Dislikes: ${
				this.props.data.question.ratedDownBy.length
			}`;
			return (
				<div className="list-group">
					<div className="list-group-item list-group-item-action flex-column align-items-start">
						<div className="row">
							<div className="col-1">
								<div className="row" style={{ textAlign: 'right' }}>
									<div className="col align-self-start">
										<div>
											<button
												className="fas fa-angle-up fa-2x"
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
												onClick={this.throttledIcrement}
											/>
										</div>
									</div>
									<div className="col align-self-start" style={{ textAlign: 'center' }}>
										<ReactTooltip effect="solid" />
										<p data-tip={hoverText}>{data.question.score}</p>
									</div>
									<div className="col align-self-start">
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
												onClick={this.throttledDecrement}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="col-2">
								<Link
									to={`/user/${data.question.user.id}`}
									style={{ textDecoration: 'none', color: 'black' }}
								>
									<ProfileSmallPage userId={data.question.user.id} />
								</Link>
							</div>
							<div className="col-2">
								<small style={{ textAlign: 'center' }}>
									Posted By {data.question.user.username} <br />
									{moment(data.question.createdAt).fromNow()} <br />
									Bounty: {data.question.bounty} <br />
									Category: {data.question.category ? data.question.category : 'None'}
								</small>
							</div>
							<div className="col-7">
								<h3 className="mb-1">{data.question.questionTitle}</h3> <br />
								<div>{data.question.questionContent}</div>
							</div>
						</div>
						<div>
							{data.question.tags.map(tag => {
								return (
									<span className="badge badge-info" key={tag}>
										{tag}
									</span>
								);
							})}
						</div>
					</div>
					<AnswerList
						id={this.props.id}
						qOwnerId={data.question.user.id}
						loggedId={this.props.loggedId}
						isPaid={data.question.bountyPaid}
						bounty={data.question.bounty}
						user={this.props.user}
						questionId={this.props.id}
						signedIn={this.props.signedIn}
						notify={this.props.notify}
					/>
				</div>
			);
		}
	}
	render() {
		return this.displayQuestionContent();
	}
}

export default compose(
	graphql(getQuestion, {
		options: props => {
			return {
				variables: {
					id: props.id
				}
			};
		}
	}),
	graphql(QuestionLike, { name: 'QuestionLike' }),
	graphql(QuestionDislike, { name: 'QuestionDislike' })
)(QuestionContent);
