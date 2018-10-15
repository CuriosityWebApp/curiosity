import React, { Component } from 'react';
import moment from 'moment';

class SearchItem extends Component {
  render() {
    let {
      id,
      questionTitle,
      bounty,
      user,
      createdAt,
      restriction,
      answers,
      questionContent,
    } = this.props.postData;
    return (
      <div className="list-group">
        <div
          className="list-group-item list-group-item-action flex-column align-items-start"
          onClick={() => {
            this.props.onSelect(id);
          }}
          style={{ cursor: 'pointer' }}
        >
          <div className="d-flex w-100 justify-content-between">
            <h5>{questionTitle}</h5>
            <h6>Reward: {bounty}</h6>
          </div>
          <div>
            <small className="text-muted d-flex w-100 justify-content-between">
              Posted By {user.username} {moment(createdAt).fromNow()}
            </small>
            <small className="text-muted"> Rank {restriction} </small>
            <small className="text-muted"> Answers {answers.length}</small>
            <p>{questionContent}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchItem;
