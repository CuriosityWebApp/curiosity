import React, { Component } from 'react';
import { ClearNotifications } from '../../mutations/mutations.js';
import { graphql } from 'react-apollo';
import NotificationItem from './NotificationItem.jsx';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.displayNotifications = this.displayNotifications.bind(this);
    this.clearNotifications = this.clearNotifications.bind(this);
  }

  displayNotifications() {
    let unreadNotifications = [];
    for (let j = 0; j < this.props.questions.length; j++) {
      for (let k = 0; k < this.props.questions[j].answers.length; k++) {
        if (this.props.questions[j].answers[k].questionerSeen === false) {
          unreadNotifications.push(this.props.questions[j].answers[k]);
        }
      }
    }
    if (unreadNotifications.length > 0) {
      return unreadNotifications.map(post => {
        return <NotificationItem key={post.id} post={post} />;
      });
    } else {
      return (
        <div className="card">
          <div className="card-body">
            <div>No Notifications</div>
          </div>
        </div>
      );
    }
  }
  clearNotifications() {
    console.log(this.props.userId);
    this.props.ClearNotifications({
      mutation: ClearNotifications,
      variables: {
        userId: this.props.userId,
      },
    });
  }

  render() {
    return (
      <div>
        <h2> Notifications</h2>
        <button type="button" className="btn btn-warning" onClick={this.clearNotifications}>
          Clear Notifications
        </button>
        {this.displayNotifications()}
      </div>
    );
  }
}

export default graphql(ClearNotifications, { name: 'ClearNotifications' })(Notifications);
