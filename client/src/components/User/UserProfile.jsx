import React, { Component } from 'react';
import { graphql, Query } from 'react-apollo';
import { getUser } from '../../queries/queries.js';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.displayUser = this.displayUser.bind(this);
  }

  render() {
    return (
      <Query query={getUser} variables={{ id: '5bb28b0d1723602d90864b70' }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error! ${error}</p>;
          } else {
            console.log(data);
            return <div>hello</div>;
          }
        }}
      </Query>
    );
  }
}

export default UserProfile;
