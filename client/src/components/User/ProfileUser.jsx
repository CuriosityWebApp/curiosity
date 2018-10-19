import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getUser } from '../../queries/queries.js';
import UserInfo from './UserInfo.jsx';

class ProfileUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { data, notify } = this.props;
    let { loading, error, user, refetch } = data;
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error...</div>;
    } else {
      refetch();
      return (
        <div>
          <div className="card">
            <div className="row">
              <div className="col">
                <div className="card shadow rounded">
                  <div className="card-header headerColor text-white leftAlign">
                    <i className="fa fa-cog marigold" /> <strong>Settings</strong>
                  </div>
                  <UserInfo user={user} refetch={refetch} notify={notify} data={data} />
                </div>
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
        id: props.id,
      },
    };
  },
})(ProfileUser);
