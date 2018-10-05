import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class QuestionItem extends Component {
	render() {
		let { postData } = this.props;
		return (
			<Link to="">
				<div className="list-group">
					<div className="inline-block">
						<button className="fa fa-toggle-up" aria-hidden="true" /> {postData.score}{' '}
						<button className="fa fa-toggle-down" aria-hidden="true" />
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

export default QuestionItem;
