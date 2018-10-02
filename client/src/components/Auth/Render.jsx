import React, { Component } from 'react';
import QuestionList from '../Question/QuestionList.jsx';
import { graphql } from 'react-apollo';
import { checkUserEmail } from '../../queries/queries';
import { database } from 'firebase';

class Render extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      newUser: false,
      // will have userId after all calls are finished
      userId: '',
    };
    this.finishRegistration = this.finishRegistration.bind(this);
    this.check = this.check.bind(this);
  }
  componentDidMount() {
    this.check();
  }
  check() {
    if (!this.props.data.checkUserEmail.username) {
      this.setState({
        newUser: 'true',
      });
    } else {
      this.setState({
        userId: this.props.data.checkUserEmail.id,
      });
    }
  }
  finishRegistration() {
    this.setState({ newUser: 'false' });
  }
  render() {
    return (
      <div>
        {this.state.newUser ? (
          <UsernameSubmit email={this.state.email} finishRegistration={this.finishRegistration} />
        ) : (
          <div>
            <button onClick={() => this.props.firebaseAuth.signOut()}>Sign out!</button>
            <QuestionList />
          </div>
        )}
      </div>
    );
  }
}

export default graphql(checkUserEmail, {
  options: props => {
    return {
      variables: {
        email: props.email,
      },
    };
  },
})(Render);
