import React, { Component } from 'react';
import Main from '../Main/Main.jsx';
import { checkUserEmail } from '../../queries/queries.js';
import { graphql } from 'react-apollo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
    };
  }

  render() {
    let { loading, error } = this.props.checkUserEmail;
    if (loading) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>Error</div>;
    } else {
      if (this.props.checkUserEmail.checkUserEmail) {
        var signedIn = true;
        this.props.checkUserEmail.refetch();
      } else {
        var signedIn = false;
      }
      return (
        <Main
          notify={this.props.notify}
          email={this.props.email}
          signedIn={signedIn}
          user={this.props.checkUserEmail.checkUserEmail}
          refetcher={this.props.checkUserEmail}
          handleLogout={this.props.handleLogout}
          uiConfig={this.props.uiConfig}
          firebaseAuth={this.props.firebase.auth()}
          firebaseCheck={this.props.firebaseCheck}
        />
      );
    }
  }
}

export default graphql(checkUserEmail, {
  name: 'checkUserEmail',
  options: props => {
    return {
      variables: {
        email: props.email,
      },
    };
  },
})(App);
