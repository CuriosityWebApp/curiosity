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
    let { loading, error, user } = this.props.data;
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error...</div>;
    } else {
      if (this.props.data.userSentMessages.length > 0) {
        return this.props.data.userSentMessages.map(post => {
          return (
            <MessageItem
              key={post.id}
              post={post}
              onSelect={this.onSelect}
              userMessages={this.props.userMessages}
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
