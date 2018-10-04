import React from 'react';
import { graphql } from 'react-apollo';
import { AddUser } from '../../mutations/mutations.js';

class UsernameSubmit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.setState({ email: this.props.email });
  }

  handleClick() {
    this.props
      .mutate({
        mutation: AddUser,
        variables: {
          username: this.state.username,
          email: this.props.email,
        },
      })
      .then(({ data }) => {
        this.props.handleUserId(data.addUser.id);
      })
      .catch(err => console.error(err));
  }

  handleInputChange(evt) {
    this.setState({ username: evt.target.value });
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
                  this.handleClick();
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
