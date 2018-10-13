import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getMessages } from '../../queries/queries.js';
import { ReadMessages } from '../../mutations/mutations.js';
import MessageItem from './MessageItem.jsx';

class NewList extends Component {
  constructor(props) {
    super(props);
    this.displayMessages = this.displayMessages.bind(this);
  }

  componentDidMount() {
    this.props.getMessages.refetch();
    setTimeout(() => {
      this.props.ReadMessages(
        {
          mutation: ReadMessages,
          variables: {
            receiverId: this.props.userId,
          },
        },
        5000,
      );
    });
  }

  displayMessages() {
    let { loading, error, user } = this.props.getMessages;
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error...</div>;
    } else {
      let newList = [];
      for (let i = 0; i < this.props.getMessages.userMessages.length; i++) {
        if (this.props.getMessages.userMessages[i].unread === true) {
          newList.push(this.props.getMessages.userMessages[i]);
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
)(NewList);
