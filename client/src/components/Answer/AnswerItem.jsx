import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAnswer } from '../../queries/queries.js';
import moment from 'moment';

class AnswerItem extends Component {
	chooseAnswer() {
		if (this.props.ownerId === this.props.loggedId && this.props.data.answer.user.id !== this.props.loggedId && !this.props.isPaid) {
			 return <small><button type="button"> Choose This Answer </button></small>
		}
	}
	displayAnswer() {
		console.log("I AM ANSWER", this.props)
		let data = this.props.data;
		if (data && data.loading) {
			return <div>Loading answers...</div>;
		} else {
			return (
				<div className="list-group">
					<div className="list-group-item list-group-item-action flex-column align-items-start">
						<div className="d-flex w-100 justify-content-between">
						  <div>
							<small>
								Answer By {data.answer.user.username} {moment(data.answer.createdAt).fromNow()}
							</small>
							<br />
							{
								this.chooseAnswer()
							}
							</div>
							<div>
								<small>Rank: {data.answer.user.rank}</small> <br />
								<small>Votes: {data.answer.score}</small>
							</div>
						</div>
						<br/>
						<div className="answerContent">
							<p>{data.answer.answer}</p>
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

export default graphql(getAnswer, {
  options: props => {
    return {
      variables: {
        id: props.answerId,
      },
    };
  },
})(AnswerItem);
