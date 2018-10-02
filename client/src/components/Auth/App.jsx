// Firebase Code
import firebase, { database } from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
firebase.initializeApp({
  apiKey: 'AIzaSyBF_AKIaEMjjU8E1ZLLjZXKTxykxhKjUG8',
  authDomain: 'curiosity-a9199.firebaseapp.com',
});
import React, { Component } from 'react';
import Render from './Render.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      email: '',
    };
    this.finishRegistration = this.finishRegistration.bind(this);
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
    firebase.auth().onAuthStateChanged(
      user => {
        this.setState({ isSignedIn: !!user });
      },
      () => {
        this.setState({ email: firebase.auth().currentUser });
      },
    );
  };
  finishRegistration = () => {
    this.setState({ newUser: 'false' });
  };
  render() {
    return (
      <div>
        {this.state.isSignedIn ? (
          <Render
            firebaseAuth={firebase.auth()}
            email={this.state.email}
            isSignedIn={this.state.isSignedIn}
          />
        ) : (
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
        )}
      </div>
    );
  }
}

export default App;
