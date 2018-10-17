import React, { Component } from 'react';
import { DeleteMessage } from '../../mutations/mutations.js';
import { graphql } from 'react-apollo';
import moment from 'moment';

class MessageItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: null,
    };
    this.deleteMessage = this.deleteMessage.bind(this);
    this.replyMessage = this.replyMessage.bind(this);
  }

  deleteMessage() {
    this.props
      .DeleteMessage({
        mutation: DeleteMessage,
        variables: {
          id: this.props.post.id,
        },
      })
      .then(() => {
        this.props.notify('error', 'Message deleted');
        if (this.props.getMessages) {
          this.props.getMessages.refetch();
        }
        if (this.props.userSentMessages) {
          this.props.userSentMessages.refetch();
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  replyMessage() {
    let { sender, messageTitle, messageContent, createdAt } = this.props.post;
    let newTitle = '(RE:"' + messageTitle + '")';
    let oldContent =
      '\n\n\n' +
      `[On ${moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')},${
        sender.username
      } wrote : "${messageContent}"]`;

    this.props.replyFormat(sender.username, newTitle, oldContent);
  }

  render() {
    let { sender, recipient, messageTitle, messageContent, createdAt, unread } = this.props.post;
    return (
      <div className="list-group">
        <div className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <div>
              <small>Sender: {sender.username}</small>
              <br />
              <small>Receiver: {recipient.username}</small>
              <br />
              <small>Message Title: {messageTitle}</small>
              <br />
              <small>Content: {messageContent}</small> <br />
              <small>Date: {moment(createdAt).fromNow()}</small> <br />
              <small>New?: {JSON.stringify(unread)}</small>
            </div>
            <div>
              <button type="button" className="btn btn-info" onClick={this.replyMessage}>
                Reply
              </button>
              <button type="button" className="btn btn-danger" onClick={this.deleteMessage}>
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

export default graphql(DeleteMessage, {
  name: 'DeleteMessage',
})(MessageItem);
