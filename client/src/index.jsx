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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

firebase.initializeApp({
  apiKey: process.env.firebaseKey,
  authDomain: process.env.firebaseDomain,
});

const client = new ApolloClient({
  uri: process.env.apolloUri,
});

class Index extends Component {
  constructor() {
    super();
    this.state = { email: null, firebaseCheck: false };
    this.firebaseCheck = this.firebaseCheck.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.notify = this.notify.bind(this);
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
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({ email: '', firebaseCheck: false });
      })
      .then(() => {
        setTimeout(() => {
          this.notify('auth', 'Signed Out');
        }, 0);
      })
      .catch(err => {
        console.error(err);
      });
  }

  notify(type, text) {
    let { TOP_RIGHT, TOP_CENTER } = toast.POSITION;
    if (type === 'transaction') {
      toast.success(text, {
        position: TOP_RIGHT,
        autoClose: 3000,
      });
    } else if (type === 'message') {
      toast.info(text, {
        position: TOP_RIGHT,
        autoClose: 3000,
      });
    } else if (type === 'auth') {
      toast(text, {
        position: TOP_CENTER,
        autoClose: 3000,
      });
    } else if (type === 'error') {
      toast.error(text, {
        position: TOP_RIGHT,
        autoClose: 3000,
      });
    } else if (type === 'warning') {
      toast.warning(text, {
        position: TOP_RIGHT,
        autoClose: 3000,
      });
    }
  }

  render() {
    if (!this.state.firebaseCheck) {
      return <div>loading</div>;
    } else {
      return (
        <div>
          <ToastContainer />
          <App
            notify={this.notify}
            email={this.state.email}
            handleLogout={this.handleLogout}
            firebase={firebase}
            firebaseCheck={this.state.firebaseCheck}
            uiConfig={this.uiConfig}
          />
        </div>
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
