import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, withApollo } from 'react-apollo';
import { BrowserRouter, Router, Route, Link } from 'react-router-dom';
import App from './components/Auth/App.jsx';
import { checkUserEmail } from './queries/queries.js';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
});

class Index extends Component {
  constructor() {
    super();
    this.state = {
      userId: null,
      isSignedIn: false,
    };
    this.setUser = this.setUser.bind(this);
  }
  setUser(ID, signedIn) {
    this.setState({ userId: ID, isSignedIn: signedIn });
  }
  render() {
    return (
      <App
        setUser={(ID, signedIn) => {
          this.setUser(ID, signedIn);
        }}
        signedIn={this.state.isSignedIn}
        userId={this.state.userId}
      />
    );
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
