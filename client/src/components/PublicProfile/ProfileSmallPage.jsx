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
        <div className="card shadow mp-1 bg-white rounded" style={{ backgroundColor: 'muted' }}>
          <img
            className="card-img-top rounded-circle mx-auto mb-1 mt-3"
            src={user.avatarUrl}
            style={{
              width: '145px',
              height: '145px',
            }}
            alt="user profile picture"
          />
          <div className="card-body mt-0 py-0">
            <h3 className="card-title " style={{ textAlign: 'center', fontWeight: 'bold' }}>
              <u>{user.username}</u>
            </h3>
            <hr />
            <h6 className="card-subtitle text-center pb-0">
              {' '}
              <b>Experience</b>
              <br />
              {user.rank}
            </h6>
            <br />
            <p
              style={{
                textAlign: 'center',
                fontSize: '12px',
                fontStyle: 'italic',
                color: 'gray',
                padding: '1px',
              }}
            >
              Member since: {moment(user.createdAt).format('LL')}
            </p>
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
