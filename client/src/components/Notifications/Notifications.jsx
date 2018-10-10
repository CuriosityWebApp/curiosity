import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getMessages } from '../../queries/queries.js';
import { ReadMessages } from '../../mutations/mutations.js';
import NotificationItem from './NotificationItem.jsx';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.displayMessages = this.displayMessages.bind(this);
  }

  displayMessages() {
    console.log(this.props);

    if (this.props.getMessages.userMessages.length > 0) {
      return this.props.getMessages.userMessages.map(post => {
        return (
          <div>
            <NotificationItem
              key={post.id}
              post={post}
              onSelect={this.onSelect}
              replyFormat={this.props.replyFormat}
              getMessages={this.props.getMessages}
            />
          </div>
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

  render() {
    return (
      <div>
        <h2> Notifications</h2>
        {this.displayMessages()}
      </div>
    );
  }
}

export default Notifications;
