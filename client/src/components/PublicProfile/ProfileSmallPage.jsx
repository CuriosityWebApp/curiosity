import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getUser } from '../../queries/queries.js';
import moment from 'moment';

class ProfileSmallPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { loading, error, user } = this.props.data;
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error...</div>;
    } else {
      return (
        <div>
          <div className="card">
            <div
              className="box"
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <div>
                <br />
                <img
                  className="rounded-circle"
                  src={user.avatarUrl}
                  style={{ width: '145px', height: '145px' }}
                />
              </div>
              <div style={{ textAlign: 'center' }}>
                <p>{user.username}</p>
                <small>rank: {user.rank}</small>
                <br />
                <small>since {moment(user.createdAt).format('LL')}</small>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default graphql(getUser, {
  options: props => {
    return {
      variables: {
        id: props.userId,
      },
    };
  },
})(ProfileSmallPage);
