import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import QuestionList from './components/Question/QuestionList.jsx';
import AnswerList from './components/Answer/AnswerList.jsx';

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

// <QuestionList />
