import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class QuestionItem extends Component {
  render() {
    let { postData } = this.props;
    return (
      <div className="list-group">
        <div
          className="list-group-item list-group-item-action flex-column align-items-start"
          onClick={() => this.props.onSelect(postData.id)}
          style={{ cursor: 'pointer' }}
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
    );
  }
}

export default QuestionItem;
