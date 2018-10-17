import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

class NotificationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: null,
    };
  }

  render() {
    let { question, answer, createdAt } = this.props.post;
    return (
      <div className="list-group">
        <div className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <div>
              <small>Question Title: {question.questionTitle}</small>
              <br />
              <small>Answer: {answer}</small>
              <br />
              <small>Date: {moment(createdAt).fromNow()}</small> <br />
            </div>
            <div>
              <Link to={`/questionContent/${question.id}`} style={{ cursor: 'pointer' }}>
                <button type="button" className="btn btn-success">
                  Go To Question
                </button>
              </Link>
            </div>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default NotificationItem;
