import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getMessages } from '../../queries/queries.js';
import { Redirect } from 'react-router-dom';
import MessageItem from './MessageItem.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(id) {
    this.setState({
      selected: id,
    });
  }

  displayQuestions() {
    let { loading, error, user } = this.props.data;
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error...</div>;
    } else {
      this.props.data.refetch();
      if (this.props.data.userMessages.length > 0) {
        return this.props.data.userMessages.map(post => {
          return (
            <MessageItem
              key={post.id}
              post={post}
              onSelect={this.onSelect}
              data={this.props.data}
            />
          );
        });
      } else {
        return (
          <div className="card">
            <div className="card-body">
              <div>No Answers</div>
            </div>
          </div>
        );
      }
    }
  }

  render() {
    if (!this.state.selected) {
      return (
        <div>
          <h2>
            <u>Messages</u>
          </h2>
          <div>{this.displayQuestions()}</div>
        </div>
      );
    } else {
      // return <Redirect to={`/questionContent/${this.state.selected}`} />;
    }
  }
}

export default graphql(getMessages, {
  options: props => {
    return {
      variables: {
        receiverId: props.userId,
      },
    };
  },
})(MessageList);
