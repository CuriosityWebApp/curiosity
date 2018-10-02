import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAnswer } from '../../queries/queries.js';

class AnswerItem extends Component {
	displayAnswer() {
		let data = this.props.data;
		console.log(data);
		if (data && data.loading) {
			return <div>Loading answers...</div>;
		} else {
			return (
				<div className="list-group">
          <div className= "list-group-item list-group-item-action flex-column align-items-start">
				    <div className="d-flex w-100 justify-content-between">
				    		<small>Answer By {data.answer.user.username}</small> <br />
								<div>
				    		  <small>Rank: {data.answer.user.rank}</small> <br />
								  <small>Votes: {data.answer.score}</small>
								</div>
				    </div>
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

{/* <div class="d-flex w-100 justify-content-between">
								    <h3 className="mb-1">{data.question.questionTitle}</h3>
										<div>
								      <small>Bounty: {data.question.bounty}</small>
											<br/>
								      <small>Category: {data.question.category}</small>
										</div>
                  </div> */}

export default graphql(getAnswer, {
	options: props => {
		return {
			variables: {
				id: props.answerId
			}
		};
	}
})(AnswerItem);
