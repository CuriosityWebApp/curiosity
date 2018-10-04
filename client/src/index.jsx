import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Router, Route, Link, browserHistory } from 'react-router-dom';
import App from './components/Auth/App.jsx';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
});

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '5bb28b0d1723602d90864b70',
    };
  }
  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid" id="home-jumbo">
          <div className="container" style={{ marginLeft: 50, marginRight: 25 }}>
            <h1 className="display-4">Curiosity</h1>
            <p className="lead">Hello world</p>
            <div className="pb-1" />
            {/* <Signup emailAndPassSignUp={props.emailAndPassSignUp} googleSignUp={props.googleSignUp} /> */}
          </div>
        </div>
        <div>
          <App userId={this.state.userId} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter >
      <Index />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);
