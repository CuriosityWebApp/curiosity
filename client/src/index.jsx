import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Router, Route, Link } from 'react-router-dom';
import QuestionList from './components/Question/QuestionList.jsx';

const client = new ApolloClient({
	uri: 'http://localhost:3000/graphql'
});

class App extends Component {
	constructor() {
		super();
	}
	render() {
		return (
			<div>
				<QuestionList />
			</div>
		);
	}
}

ReactDOM.render(
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>,
	document.getElementById('root')
);
