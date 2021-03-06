import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getMessages } from '../../queries/queries.js';
import { ReadMessages } from '../../mutations/mutations.js';
import MessageItem from './MessageItem.jsx';

class NewList extends Component {
  constructor(props) {
    super(props);
    this.displayMessages = this.displayMessages.bind(this);
    this.clearMessages = this.clearMessages.bind(this);
  }

  componentDidMount() {
    this.props.getMessages.refetch();
  }

  clearMessages() {
    this.props
      .ReadMessages({
        mutation: ReadMessages,
        variables: {
          receiverId: this.props.userId,
        },
      })
      .then(() => {
        this.props.getMessages.refetch();
        this.props.refetch();
        this.props.notify('warning', 'Unread Messages cleared');
      });
  }

  displayMessages() {
    let { loading, error, userMessages } = this.props.getMessages;
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error...</div>;
    } else {
      let newList = [];
      for (let i = 0; i < userMessages.length; i++) {
        if (userMessages[i].unread === true) {
          newList.push(userMessages[i]);
        }
      }
      if (newList.length > 0) {
        return newList.map(post => {
          return (
            <MessageItem
              key={post.id}
              post={post}
              replyFormat={this.props.replyFormat}
              onSelect={this.onSelect}
              getMessages={this.props.getMessages}
              notify={this.props.notify}
            />
          );
        });
      } else {
        return (
          <div className="card">
            <div className="card-body">
              <div>No Messages</div>
            </div>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div
          className="list-group-item"
          style={{ backgroundColor: '#217CA3', marginBottom: '10px' }}
        >
          <strong style={{ color: 'white' }}>Unread</strong>
          <button
            type="button"
            className="btn btn-sm"
            onClick={this.clearMessages}
            style={{ float: 'right', color: '#2F3131', backgroundColor: '#F7CE3E' }}
          >
            Clear Unread Messages
          </button>
        </div>
        <div className="qa-message-list" id="wallmessages">
          {this.displayMessages()}
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(getMessages, {
    name: 'getMessages',
    options: props => {
      return {
        variables: {
          receiverId: props.userId,
        },
      };
    },
  }),
  graphql(ReadMessages, { name: 'ReadMessages' }),
)(NewList);
