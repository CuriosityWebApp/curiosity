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
        this.props.getMessages.refetch();
      });
  }

  replyMessage() {
    let newTitle = '(RE:"' + this.props.post.messageTitle + '")';
    let oldContent =
      '\n\n\n' +
      `[On ${moment(this.props.post.createdAt).format('MMMM Do YYYY, h:mm:ss a')},${
        this.props.post.sender.username
      } wrote : "${this.props.post.messageContent}"]`;

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
              <small>Message Title: {data.messageTitle}</small>
              <br />
              <small>Content: {data.messageContent}</small> <br />
              <small>Date: {moment(data.createdAt).fromNow()}</small> <br />
              <small>New?: {JSON.stringify(data.unread)}</small>
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
