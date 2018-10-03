import React, { Component } from 'react';
import Navigation from '../Navigation/Navigation.jsx';
import { BrowserRouter, Switch, Router, Route, NavLink } from 'react-router-dom';
import QuestionList from '../Question/QuestionList.jsx';
import CreateQuestion from '../Question/CreateQuestion.jsx';
import NewUserForm from '../Auth/NewUserForm.jsx';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<Navigation signedIn={this.props.signedIn} logout={this.props.logout} />
				<Switch>
					<Route exact path="/" component={QuestionList} />
					<Route exact path="/createQuestion" component={CreateQuestion} />
					<Route
						exact
						path="/login"
						render={() => {
							return <Login />;
						}}
					/>
					<Route
						exact
						path="/signup"
						render={() => {
							return <Signup />;
						}}
					/>
					<Route
						exact
						path="/newuser"
						render={() => {
							return <NewUserForm email={this.props.email} />;
						}}
					/>
				</Switch>
			</div>
		);
	}
}

export default Main;
