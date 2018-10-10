import React, { Component } from 'react';
// import { DeleteNotification } from '../../mutations/mutations.js';
import { graphql } from 'react-apollo';
import moment from 'moment';

class NotificationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: null,
    };
    this.deleteNotification = this.deleteNotification.bind(this);
    this.replyNotification = this.replyNotification.bind(this);
  }

  deleteNotification() {
    this.props
      .DeleteNotification({
        mutation: DeleteNotification,
        variables: {
          id: this.props.post.id,
        },
      })
      .then(() => {
        this.props.getNotifications.refetch();
      });
  }

  replyNotification() {
    let newTitle = '(RE:"' + this.props.post.NotificationTitle + '")';
    let oldContent =
      '\n\n\n' +
      `[On ${moment(this.props.post.createdAt).format('MMMM Do YYYY, h:mm:ss a')},${
        this.props.post.sender.username
      } wrote : "${this.props.post.NotificationContent}"]`;

    this.props.replyFormat(this.props.post.sender.username, newTitle, oldContent);
  }

  render() {
    let data = this.props.post;
    return (
      <div className="list-group">
        <div className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <div>
              <small>Sender: {data.sender.username}</small>
              <br />
              <small>Receiver: {data.recipient.username}</small>
              <br />
              <small>Notification Title: {data.NotificationTitle}</small>
              <br />
              <small>Content: {data.NotificationContent}</small> <br />
              <small>Date: {moment(data.createdAt).fromNow()}</small> <br />
              <small>New?: {JSON.stringify(data.unread)}</small>
            </div>
            <div>
              <button type="button" className="btn btn-info" onClick={this.replyNotification}>
                Reply
              </button>
              <button type="button" className="btn btn-danger" onClick={this.deleteNotification}>
                Delete
              </button>
            </div>
          </div>
          <br />
          <div className="answerContent">
            <p />
          </div>
        </div>
      </div>
    );
  }
}

export default NotificationItem;
