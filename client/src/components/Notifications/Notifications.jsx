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
    let { questions } = this.props.user;
    let unreadNotifications = [];
    for (let j = 0; j < questions.length; j++) {
      for (let k = 0; k < questions[j].answers.length; k++) {
        if (questions[j].answers[k].questionerSeen === false) {
          unreadNotifications.push(questions[j].answers[k]);
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
    let { questions } = this.props.user;
    let unreadNotifications = [];
    for (let j = 0; j < questions.length; j++) {
      for (let k = 0; k < questions[j].answers.length; k++) {
        if (questions[j].answers[k].questionerSeen === false) {
          unreadNotifications.push(questions[j].answers[k]);
        }
      }
    }
    for (let l = 0; l < unreadNotifications.length; l++) {
      var count = 0;
      this.props
        .ClearNotifications({
          mutation: ClearNotifications,
          variables: {
            id: unreadNotifications[l].id,
          },
        })
        .then(() => {
          if (count < 1) {
            this.props.notify('warning', 'Notifications cleared');
            this.props.refetcher.refetch();
          }
          count++;
        })
        .catch(err => console.error(err));
    }
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
