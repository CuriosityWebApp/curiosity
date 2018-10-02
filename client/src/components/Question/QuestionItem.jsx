import React, { Component } from 'react';
import moment from 'moment'

class QuestionItem extends Component {
	render() {
		let {postData} = this.props
		console.log(postData)
		return (
			<div className="list-group">
			  <div className="list-group-item list-group-item-action flex-column align-items-start" onClick={() => this.props.onSelect(postData.id)}>
			  	<div className="d-flex w-100 justify-content-between">
			  		<h5>{postData.questionTitle}</h5>
			  	</div>
					<div>
						<small className="text-muted">Posted By {postData.user.username} {moment(postData.createdAt).fromNow()}</small>
			  		<small className="text-muted"> Rank {postData.restriction} </small>
			  		<small className="text-muted"> Reward {postData.bounty} </small>
			  		<small className="text-muted"> Answers {postData.answers.length}</small>
			  		<p>{postData.questionContent}</p>
					</div>
			  </div>
			</div>
		);
	}
};

export default QuestionItem;

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
