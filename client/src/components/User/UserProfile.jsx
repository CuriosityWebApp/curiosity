import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getUser } from '../../queries/queries.js';

import QuestionItem from './QuestionItem.jsx';
import QuestionContent from './QuestionContent.jsx';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.displayUser = this.displayUser.bind(this);
  }

  displayUser() {
    if (this.props.data.loading) {
      return <div>Loading Questions...</div>;
    } else {
      console.log(this.props.data);
      // return data.questions.map(post => {
      //   return <QuestionItem key={post.id} postData={post} onSelect={this.onSelect} />;
      // });
    }
  }

  render() {
    if (!this.state.selected) {
      return (
        <div>
          <div>{this.displayUser()}</div>
        </div>
      );
    } else {
      return;
    }
  }
}

export default graphql(getUser, {
  options: props => {
    return {
      variables: {
        email: 'chungj0620@gmail.com',
      },
    };
  },
})(UserProfile);
