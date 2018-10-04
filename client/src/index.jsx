import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, withApollo } from 'react-apollo';
import { BrowserRouter, Router, Route, Link } from 'react-router-dom';
import App from './components/Auth/App.jsx';
import { checkUserEmail } from './queries/queries.js';

const client = new ApolloClient({
	uri: 'http://localhost:3000/graphql'
});

class Index extends Component {
	constructor() {
		super();
		this.state = {
			userId: null,
			isSignedIn: false
		};
		this.setUser = this.setUser.bind(this);
	}
	setUser(ID, signedIn) {
		this.setState({ userId: ID, isSignedIn: signedIn });
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
					<App
						setUser={(ID, signedIn) => {
							this.setUser(ID, signedIn);
						}}
						signedIn={this.state.isSignedIn}
						userId={this.state.userId}
					/>
				</div>
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
