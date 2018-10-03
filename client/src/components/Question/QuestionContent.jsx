import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { getQuestion } from '../../queries/queries.js';
import AnswerList from '../Answer/AnswerList.jsx';
import moment from 'moment'

class QuestionContent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Query query={getQuestion} variables={{ id: this.props.id }}>
				{({ loading, error, data }) => {
					if (loading) {
						return <p>Loading...</p>;
					}
					if (error) {
						return <p>Error! ${error}</p>;
					} else {
						console.log(data);
						return (
							<div className="list-group">
							  <div className="list-group-item list-group-item-action flex-column align-items-start">
		              <div className="d-flex w-100 justify-content-between">
								    <h3 className="mb-1">{data.question.questionTitle}</h3>
										<div>
								      <small>Bounty: {data.question.bounty}</small>
											<br/>
								      <small>Category: {data.question.category}</small>
										</div>
                  </div>
									<small>Posted By {data.question.user.username} {moment(data.question.createdAt).fromNow()}</small>
									<div>
										<br/>
								    <div>{data.question.questionContent}</div>
									</div>
							  </div>
								  <AnswerList id={this.props.id} />	
							</div>
						);
					}
				}}
			</Query>
		);
	}
}

export default QuestionContent;

{/* <div class="list-group">
  <a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">List group item heading</h5>
      <small>3 days ago</small>
    </div>
    <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
    <small>Donec id elit non mi porta.</small>
  </a>
  <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">List group item heading</h5>
      <small class="text-muted">3 days ago</small>
    </div>
    <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
    <small class="text-muted">Donec id elit non mi porta.</small>
  </a>
  <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">List group item heading</h5>
      <small class="text-muted">3 days ago</small>
    </div>
    <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
    <small class="text-muted">Donec id elit non mi porta.</small>
  </a>
</div> */}