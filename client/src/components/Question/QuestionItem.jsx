import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class QuestionItem extends Component {
  constructor() {
    super();
    this.UpdateLikes = this.UpdateLikes.bind();
  }
  UpdateLikes(e) {
    e.stopPropagation();
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
                    <i
                      className="fa fa-caret-up"
                      aria-hidden="true"
                      style={{ color: 'green', cursor: 'pointer' }}
                      onClick={this.UpdateLikes}
                    />
                  </div>
                  <div className="col align-self-start">{postData.score}</div>
                  <div className="col align-self-start">
                    <i
                      className="fa fa-caret-down"
                      aria-hidden="true"
                      style={{ color: 'red', cursor: 'pointer' }}
                      onClick={this.UpdateLikes}
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

export default QuestionItem;
