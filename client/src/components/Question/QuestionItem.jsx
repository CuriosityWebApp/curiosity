import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { compose, graphql } from 'react-apollo';
import { getQuestions } from '../../queries/queries.js';
import { UpdatePostLikes } from '../../mutations/mutations.js';

class QuestionItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			clicked: null
		};
		this.UpdateQuestionLikes = this.UpdateQuestionLikes.bind(this);
	}
	UpdateQuestionLikes(e) {
		if (e.target.value > 0 && (this.state.clicked === null || this.state.clicked === 'down')) {
			this.props
				.UpdatePostLikes({
					variables: {
						id: this.props.postData.id,
						score: 1
					},
					refetchQueries: [{ query: getQuestions }]
				})
				.then(() => this.setState({ clicked: 'up' }));
		} else if (e.target.value < 0 && (this.state.clicked === null || this.state.clicked === 'up')) {
			this.props
				.UpdatePostLikes({
					variables: {
						id: this.props.postData.id,
						score: -1
					},
					refetchQueries: [{ query: getQuestions }]
				})
				.then(() => this.setState({ clicked: 'down' }));
		} else {
			alert('You cannot add multiple likes/dikes to 1 answer!');
		}
	}
	render() {
		let { postData } = this.props;
		return (
			<Link to="">
				<div className="list-group">
					<div className="inline-block">
						<button
							value={1}
							className="fa fa-toggle-up"
							aria-hidden="true"
							onClick={this.UpdateQuestionLikes}
						/>{' '}
						{postData.score}{' '}
						<button
							value={-1}
							className="fa fa-toggle-down"
							aria-hidden="true"
							onClick={this.UpdateQuestionLikes}
						/>
						<div
							className="list-group-item list-group-item-action flex-column align-items-start"
							onClick={() => this.props.onSelect(postData.id)}
						>
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
			</Link>
		);
	}
}

export default graphql(UpdatePostLikes, { name: 'UpdatePostLikes' })(QuestionItem);
