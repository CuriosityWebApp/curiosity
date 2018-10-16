import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { userSentMessages } from '../../queries/queries.js';
import MessageItem from './MessageItem.jsx';

class SentList extends Component {
  constructor(props) {
    super(props);
    this.displayMessages = this.displayMessages.bind(this);
  }

  displayMessages() {
    let { loading, error, userSentMessages } = this.props.data;
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error...Sent</div>;
    } else {
      if (userSentMessages.length > 0) {
        return userSentMessages.map(post => {
          return (
            <MessageItem
              key={post.id}
              post={post}
              replyFormat={this.props.replyFormat}
              onSelect={this.onSelect}
              userSentMessages={this.props.data}
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
    return <div>{this.displayMessages()}</div>;
  }
}

export default graphql(userSentMessages, {
  options: props => {
    return {
      variables: {
        senderId: props.userId,
      },
    };
  },
})(SentList);
