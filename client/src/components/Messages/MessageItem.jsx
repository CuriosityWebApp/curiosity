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
    this.displayMessage = this.displayMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
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
        this.props.data.refetch();
      });
  }

  displayMessage() {
    let data = this.props.post;
    if (data && data.loading) {
      return <div>Loading messages...</div>;
    } else {
      return (
        <div className="list-group">
          <div className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
              <div>
                <small>Message Title: {data.messageTitle}</small>
                <br />
                <small>Sender: {data.sender.username}</small>
                <br />
                <small>Content: {data.messageContent}</small> <br />
              </div>
              <div>
                <small> {moment(data.createdAt).fromNow()}</small>
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

  render() {
    return <div>{this.displayMessage()}</div>;
  }
}

export default graphql(DeleteMessage, {
  name: 'DeleteMessage',
})(MessageItem);
