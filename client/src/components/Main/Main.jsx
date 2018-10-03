import React, { Component } from 'react';
import Navigation from '../Navigation/Navigation.jsx';
import { BrowserRouter, Switch, Router, Route, NavLink } from 'react-router-dom';
import QuestionList from '../Question/QuestionList.jsx';
import CreateQuestion from '../Question/CreateQuestion.jsx';
import UsernameSubmit from '../Auth/UsernameSubmit.jsx';
import Logout from '../Auth/Logout.jsx';
import Login from '../Auth/Login.jsx';
import ProfileUser from '../User/ProfileUser.jsx';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		console.log("from main route", this.props.oAuthData)
		return (
			<div>
				<Navigation oAuthData={this.props.oAuthData} logout={this.props.logout} />
				  <Switch>
						<Route exact path="/" render={() => <QuestionList userId={this.props.userId} />} />
					  <Route exact path="/createQuestion" render={() => <CreateQuestion userId={this.props.userId} />} />
				  	<Route
				  		exact
				  		path="/login"
				  		render={() => {
				  			return <Login uiConfig={this.props.uiConfig} firebaseAuth={this.props.firebaseAuth}/>;
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
				  		path="/logout"
				  		render={() => {
				  			return <Logout />;
				  		}}
				  	/>
						<Route
				  		exact
				  		path="/profileUser"
				  		render={() => {
				  			return <ProfileUser />;
				  		}}
				  	/>
				  	<Route
				  		exact
				  		path="/newuser"
				  		render={() => {
				  			return <UsernameSubmit email={this.props.email} />;
				  		}}
				  	/>
				  </Switch>
			</div>
		);
	}
}

export default Main;

         