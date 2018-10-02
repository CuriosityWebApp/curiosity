import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Router, Route, Link } from 'react-router-dom';
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
		    <div className="jumbotron jumbotron-fluid" id="home-jumbo">
		    	<div className="container" style={{ marginLeft: 50, marginRight: 25 }}>
		    		<h1 className="display-4">Curiosity</h1>
		    		<p className="lead">Hello world</p>
		    		<div className="pb-1"></div>
		    		{/* <Signup emailAndPassSignUp={props.emailAndPassSignUp} googleSignUp={props.googleSignUp} /> */}
		    	</div>
		    </div>
			  <div>
			  	<QuestionList />
			  </div>
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
