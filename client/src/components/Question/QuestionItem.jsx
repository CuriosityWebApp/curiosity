import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { compose, graphql } from 'react-apollo';
import { getQuestions } from '../../queries/queries.js';
import { QuestionLike, QuestionDislike } from '../../mutations/mutations.js';

class QuestionItem extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.setState({ score: this.props.postData.score });
	}
	IncrementLikes(e) {
		e.stopPropagation();
		let up, down, data;
		let userId = this.props.userId;
		data = this.props.postData;
		up = new Set(data.ratedUpBy);
		down = new Set(data.ratedDownBy);
		if (up.has(userId)) {
			this.props.QuestionLike({
				mutation: QuestionLike,
				variables: {
					id: data.id,
					userId: userId,
					method: 'delete'
				},
				refetchQueries: [
					{
						query: getQuestions,
						variable: {
							limit: 15,
							skip: 0
						}
					}
				]
			});
			// .then(({ data }) => {
			// 	console.log('this is data ', data);
			// 	// this.setState({ score: data.QuestionRatedUpBy.score });
			// 	this.props.refetch();
			// });
		} else if (!up.has(userId) && !down.has(userId)) {
			this.props.QuestionLike({
				mutation: QuestionLike,
				variables: {
					id: data.id,
					userId: userId,
					method: 'add'
				},
				refetchQueries: [
					{
						query: getQuestions,
						variables: {
							limit: 15,
							skip: 0
						}
					}
				]
			});
			// .then(({ data }) => {
			// 	console.log('this is data ', data);

			// 	// this.setState({ score: data.QuestionRatedUpBy.score });
			// 	this.props.refetch();
			// });
		}
	}

	decrementLikes(e) {
		e.stopPropagation();
		let up, down, data;
		let userId = this.props.userId;
		data = this.props.postData;
		up = new Set(data.ratedUpBy);
		down = new Set(data.ratedDownBy);

		if (down.has(userId)) {
			this.props.QuestionDislike({
				mutation: QuestionDislike,
				variables: {
					id: data.id,
					userId: userId,
					method: 'delete'
				},
				refetchQueries: [{ query: getQuestions }]
			});
			// .then(({ data }) => {
			// 	this.props.refetch();
			// 	// this.setState({ score: data.QuestionRatedDownBy.score });
			// });
		} else if (!up.has(userId) && !down.has(userId)) {
			this.props.QuestionDislike({
				mutation: QuestionDislike,
				variables: {
					id: data.id,
					userId: userId,
					method: 'add'
				},
				refetchQueries: [{ query: getQuestions }]
			});
			// .then(({ data }) => {
			// 	this.props.refetch();
			// 	// this.setState({ score: data.QuestionRatedDownBy.score });
			// });
		}
	}

	render() {
		let { postData } = this.props;
		return (
			<div className="inline-block container" style={{ cursor: 'pointer' }}>
				<div className="list-group">
					<div
						className="list-group-item list-group-item-action flex-column align-items-start"
						onClick={() => this.props.onSelect(postData.id)}
					>
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
									<div className="col align-self-start">{postData.score}</div>
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
									<h5>{postData.questionTitle}</h5>
									<h6>Reward: {postData.bounty}</h6>
								</div>
								<div>
									<small className="text-muted d-flex w-100 justify-content-between">
										Posted By {postData.user.username} {moment(postData.createdAt).fromNow()}
									</small>
									<small className="text-muted"> Rank {postData.restriction} </small>
									<small className="text-muted"> Answers {postData.answers.length}</small>
									<p>{postData.questionContent}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default compose(
	graphql(QuestionLike, { name: 'QuestionLike' }),
	graphql(QuestionDislike, { name: 'QuestionDislike' })
)(QuestionItem);
