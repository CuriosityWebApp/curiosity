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
    let { question, answer, user, createdAt } = this.props.post;
    return (
      <div className="message-item" id="m16" style={{ width: '80%', marginLeft: '6%' }}>
        <div className="message-inner">
          <div className="message-head clearfix">
            <div className="row">
              <div className="col" style={{ marginLeft: '15px' }}>
                <h2 className="handle">
                  <div style={{ fontSize: '1.5rem' }}>
                    <strong>Response to '{question.questionTitle}'</strong>
                    <div style={{ float: 'right' }}>
                      <Link to={`/questionContent/${question.id}`} style={{ cursor: 'pointer' }}>
                        <button type="button" className="btn btn-success">
                          Go To Question
                        </button>
                      </Link>
                    </div>
                  </div>
                </h2>
                <div>{user.username}</div>
                <span className="qa-message-when-data">
                  <i>{moment(createdAt).fromNow()}</i>
                </span>
              </div>
            </div>
          </div>
          <div className="qa-message-content" style={{ marginLeft: '15px' }}>
            <div style={{ fontSize: '1rem' }}>{answer}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotificationItem;
