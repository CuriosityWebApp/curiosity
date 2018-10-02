import React, { Component } from 'react';
import Navigation from '../Navigation/Navigation.jsx';
import { BrowserRouter, Switch, Router, Route, Link } from 'react-router-dom';
import QuestionList from '../Question/QuestionList.jsx';
import CreateQuestion from '../Question/CreateQuestion.jsx';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<Navigation signedIn={this.props.signedIn} logout={this.props.logout} />
				<BrowserRouter>
					<Switch>
						<Route
							path="/"
							render={() => {
								return <QuestionList />;
							}}
						/>
						<Route
							path="createQuestion"
							render={() => {
								return <CreateQuestion />;
							}}
						/>
						<Route
							path="/login"
							render={() => {
								return <Login />;
							}}
						/>
						<Route
							path="/signup"
							render={() => {
								return <Signup />;
							}}
						/>
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default Main;
