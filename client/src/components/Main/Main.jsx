import React, { Component } from 'react';
import { Query, graphql } from 'react-apollo';
import Navigation from '../Navigation/Navigation.jsx';
import { BrowserRouter, Switch, Router, Route, NavLink, Redirect } from 'react-router-dom';
import QuestionList from '../Question/QuestionList.jsx';
import CreateQuestion from '../Question/CreateQuestion.jsx';
import QuestionContent from '../Question/QuestionContent.jsx';
import UsernameSubmit from '../Auth/UsernameSubmit.jsx';
import Login from '../Auth/Login.jsx';
import ProfileUser from '../User/ProfileUser.jsx';
import { checkUserEmail } from '../../queries/queries.js';


class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: null
		};
		this.handleUserId = this.handleUserId.bind(this);
		this.handleLogOut = this.handleLogOut.bind(this);
	}

  handleUserId(id) {
		this.setState({
			userId: id
		})
	}

	handleLogOut() {
		this.setState({
			userId: null
		})
	}

	render() {
		return (
			<div>
				<Navigation oAuthData={this.props.oAuthData} logout={this.props.logout} handleLogOut={this.handleLogOut} />
				  <Switch>
						<Route exact path="/" render={() => <QuestionList signedIn={this.props.signedIn} userId={this.props.userId} />} />
					  <Route exact path="/createQuestion" render={() => <CreateQuestion userId={this.props.userId} />} />
				  	<Route
				  		exact
				  		path="/login"
				  		render={() => {
				  			{
									if (!this.props.oAuthData) {
										return <Login uiConfig={this.props.uiConfig} firebaseAuth={this.props.firebaseAuth}/>;
									} else {
										return (
											<Query
												query={ checkUserEmail }
												variables={{ email: this.props.oAuthData.email }}
												fetchPolicy='no-cache'
											>
                        {({ loading, error, data }) => {
													if ( loading ) { return <p>Loading...</p> }
													if ( error ) { return <p>{error}</p> }
													if (!data.checkUserEmail) {
                            return <UsernameSubmit email={this.props.oAuthData.email} handleUserId={this.handleUserId}/>
													} else {
														this.setState({
															userId: data.checkUserEmail.id
														})
														return <Redirect to='/' />
													}
												}}
											</Query>
										)
									}
								}
				  		}}
				  	/>
						<Route
				  		exact
				  		path="/profileUser"
				  		render={() => {
				  			return <ProfileUser id={this.props.userId}/>;
				  		}}
				  	/>
						<Route
						  exact
				  		path="/questionContent/:questionId"
				  		render={({match}) => {
								return <QuestionContent userId={this.props.userId} id={match.params.questionId}/>
				  		}}
				  	/>
				  </Switch>
			</div>
		);
	}
}

export default Main;

         