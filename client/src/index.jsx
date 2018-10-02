import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Router, Route, Link } from 'react-router-dom';
import App from './components/Auth/App.jsx';

const client = new ApolloClient({
	uri: 'http://localhost:3000/graphql'
});

class Index extends Component {
	constructor() {
		super();
	}
	render() {
		return (
			<div>
				<App />
			</div>
		);
	}
}

ReactDOM.render(
	<ApolloProvider client={client}>
		<BrowserRouter>
			<Index />
		</BrowserRouter>
	</ApolloProvider>,
	document.getElementById('root')
);
