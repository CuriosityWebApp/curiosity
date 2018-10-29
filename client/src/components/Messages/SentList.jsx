import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { userSentMessages } from '../../queries/queries.js';
import SentItem from './SentItem.jsx';

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
            <SentItem
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
    return (
      <div className="container">
        <div
          className="list-group-item"
          style={{ backgroundColor: '#217CA3', marginBottom: '10px' }}
        >
          <strong style={{ color: 'white' }}>Sent</strong>
        </div>
        <div className="qa-message-list" id="wallmessages">
          {this.displayMessages()}
        </div>
      </div>
    );
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
