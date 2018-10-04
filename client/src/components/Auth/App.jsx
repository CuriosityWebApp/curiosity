import React, { Component } from 'react';
import firebase, { database } from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Main from '../Main/Main.jsx';
import UsernameSubmit from './UsernameSubmit.jsx';
import Login from './Login.jsx';
import { checkUserEmail } from '../../queries/queries.js';
import { graphql, client, withApollo } from 'react-apollo';
import { check } from 'graphql-anywhere';

firebase.initializeApp({
  apiKey: 'AIzaSyBF_AKIaEMjjU8E1ZLLjZXKTxykxhKjUG8',
  authDomain: 'curiosity-a9199.firebaseapp.com',
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      email: '',
      userId: null,
      loading: true,
      oAuthData: null,
    };
    // this.finishRegistration = this.finishRegistration.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.authListener = this.authListener.bind(this);
    this.getUser = this.getUser.bind(this);
  }
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  componentDidMount = () => {
    this.authListener();
  };

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState(
          {
            loading: false,
            isSignedIn: true,
            oAuthData: Object.assign({}, user.providerData[0]),
          },
          () => {
            this.getUser(this.state.oAuthData.email);
          },
        );
      } else {
        this.setState({
          loading: false,
          oAuthData: null,
        });
      }
    });
  }

  getUser = async email => {
    const userId = await this.props.client
      .query({
        query: checkUserEmail,
        variables: {
          email: email,
        },
      })
      .then(({ data }) => {
        this.setState({ userId: data.checkUserEmail.id });
      })
      .catch(err => console.log('you got an error', err));
  };

  handleLogout() {
    this.setState({
      oAuthData: null,
    });

    firebase
      .auth()
      .signOut()
      .then(() => {
        return;
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (this.state.loading) {
      return <div>loading</div>;
    }
    return (
      <div>
        <Main
          oAuthData={this.state.oAuthData}
          isSignedIn={this.state.isSignedIn}
          userId={this.props.userId}
          logout={this.handleLogout}
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
}

export default withApollo(App);
