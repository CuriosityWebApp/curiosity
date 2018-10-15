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
    let { notify, email, handleLogout, uiConfig, firebase, firebaseCheck } = this.props;
    let { loading, error, checkUserEmail, refetch } = this.props.checkUserEmail;
    if (loading) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>Error</div>;
    } else {
      if (checkUserEmail) {
        var signedIn = true;
        refetch();
      } else {
        var signedIn = false;
      }
      return (
        <Main
          notify={notify}
          email={email}
          signedIn={signedIn}
          user={checkUserEmail}
          refetcher={refetch}
          handleLogout={handleLogout}
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
          firebaseCheck={firebaseCheck}
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
