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
    let data = this.props.post;
    return (
      <div className="list-group">
        <div className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <div>
              <small>Question Title: {data.question.questionTitle}</small>
              <br />
              <small>Answer: {data.answer}</small>
              <br />
              <small>Date: {moment(data.createdAt).fromNow()}</small> <br />
            </div>
            <div>
              <Link to={`/questionContent/${data.question.id}`} style={{ cursor: 'pointer' }}>
                <button type="button" className="btn btn-danger">
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
