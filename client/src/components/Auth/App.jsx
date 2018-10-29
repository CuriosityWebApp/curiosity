import React, { Component } from 'react';
import { checkUserEmail } from '../../queries/queries.js';
import { graphql } from 'react-apollo';
import QuestionList from '../Main/QuestionList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
    };
  }

  render() {
    let { notify, email, handleLogout, uiConfig, firebase, firebaseCheck } = this.props;
    let { loading, error } = this.props.checkUserEmail;
    if (loading) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>Error</div>;
    } else {
      let { checkUserEmail, refetch } = this.props.checkUserEmail;
      if (checkUserEmail) {
        var signedIn = true;
        var userId = checkUserEmail.id;
      } else {
        var signedIn = false;
        var userId = null;
      }
      return (
        <QuestionList
          notify={notify}
          user={checkUserEmail}
          userId={userId}
          notify={notify}
          email={email}
          signedIn={signedIn}
          user={checkUserEmail}
          refetch={refetch}
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
