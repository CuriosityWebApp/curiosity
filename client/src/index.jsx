import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import App from './components/Auth/App.jsx';
import firebase, { database } from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyBF_AKIaEMjjU8E1ZLLjZXKTxykxhKjUG8',
  authDomain: 'curiosity-a9199.firebaseapp.com',
});

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
});

class Index extends Component {
  constructor() {
    super();
    this.state = { email: null, firebaseCheck: false };
    this.firebaseCheck = this.firebaseCheck.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.firebaseCheck();
  }

  firebaseCheck() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ email: user.email, firebaseCheck: true });
      } else {
        this.setState({ firebaseCheck: true });
      }
    });
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
  handleLogout() {
    console.log('logout');
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({ email: '' });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (!this.state.firebaseCheck) {
      return <div>loading</div>;
    } else {
      return (
        <App
          email={this.state.email}
          handleLogout={this.handleLogout}
          firebase={firebase}
          firebaseCheck={this.state.firebaseCheck}
          uiConfig={this.uiConfig}
        />
      );
    }
  }
}
ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Index />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);
