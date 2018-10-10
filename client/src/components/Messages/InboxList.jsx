import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getMessages } from '../../queries/queries.js';
import { ReadMessages } from '../../mutations/mutations.js';
import MessageItem from './MessageItem.jsx';

class InboxList extends Component {
  constructor(props) {
    super(props);
    this.displayMessages = this.displayMessages.bind(this);
  }

  displayMessages() {
    let { loading, error, user } = this.props.getMessages;
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error...</div>;
    } else {
      if (this.props.getMessages.userMessages.length > 0) {
        return this.props.getMessages.userMessages.map(post => {
          return (
            <MessageItem
              key={post.id}
              post={post}
              onSelect={this.onSelect}
              replyFormat={this.props.replyFormat}
              getMessages={this.props.getMessages}
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
)(InboxList);
