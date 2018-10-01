import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

const client = new ApolloClient({
	uri: 'http://localhost:3000/graphql'
});

class App extends Component {
	constructor() {
		super();
	}
	render() {
		return (
			<ApolloProvider client={client}>
				<div>
					<h1>Hey im working</h1>
				</div>
			</ApolloProvider>
		);
	}
}
ReactDOM.render(<App />, document.getElementById('root'));
