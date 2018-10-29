import React from 'react';
import { graphql } from 'react-apollo';
import { AddUser } from '../../mutations/mutations.js';

class UsernameSubmit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
    this.handleAddUser = this.handleAddUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleAddUser() {
    this.props
      .mutate({
        mutation: AddUser,
        variables: {
          username: this.state.username,
          email: this.props.email,
        },
      })

      .catch(err => console.error(err));
  }

  handleInputChange(e) {
    e.preventDefault();
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <div>
        <h3>Choose a username</h3>
        <form>
          <div>
            <input
              className="form-control"
              type="text"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <p>
              <button
                onClick={e => {
                  this.handleAddUser();
                }}
              >
                Finish Registration
              </button>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default graphql(AddUser)(UsernameSubmit);
