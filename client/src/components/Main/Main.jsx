import React, { Component } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import QuestionList from '../Question/QuestionList.jsx';
import CreateQuestion from '../Question/CreateQuestion.jsx';
import QuestionContent from '../Question/QuestionContent.jsx';
import UsernameSubmit from '../Auth/UsernameSubmit.jsx';
import Login from '../Auth/Login.jsx';
import ProfileUser from '../User/ProfileUser.jsx';
import Search from '../Search/Search.jsx';
import SearchList from '../Search/SearchList.jsx';
//navigation
import { LinkContainer } from 'react-router-bootstrap';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

	render() {
		let { username, signedIn, rank, credits, id, email } = this.props.user;
		console.log("IM MAIN", id, username)
		return (
			<div>
				<div id="snb">
					<nav id="mysidenav_lft" className="sidenav" style={{ width: '250px' }}>
						<a className="graduation">
							<span className="pl-2">Curiosity</span>
						</a>
						<div className="profile-box">
							{signedIn ? (
								<div className="media">
									<a className="pull-left pt-2">
										<img className="rounded-circle" src="http://via.placeholder.com/40x40" />
									</a>
									<div className="media-body">
										<h5 className="media-heading">
											Welcome <span>{username}</span>
										</h5>
										<small>{credits} Credits</small>
									</div>
								</div>
							) : (
								<div className="media">
									<a className="pull-left pt-2">
										<img className="rounded-circle" src="http://via.placeholder.com/40x40" />
									</a>
									<div className="media-body">
										<h5 className="media-heading">Please</h5>
										<h5>Login</h5>
									</div>
								</div>
							)}
						</div>
						<div className="accordion" id="accordion_sidenav_lft">
							{signedIn ? (
								<div>
									<div className="card">
										<div className="card-header">
											<LinkContainer to="/">
												<div>Question List</div>
											</LinkContainer>
										</div>
									</div>
									<div className="card">
										<div className="card-header">
											<LinkContainer to="/createQuestion">
												<div>Ask Question</div>
											</LinkContainer>
										</div>
									</div>
									<div className="card">
										<div className="card-header">
											<LinkContainer to="/profileUser">
												<div>Profile</div>
											</LinkContainer>
										</div>
									</div>
									<div className="card">
										<div className="card-header">
											<Link
												to="/"
												onClick={e => {
													this.props.logout();
												}}
											>
												Log Out
											</Link>
										</div>
									</div>
								</div>
							) : (
								<div>
									<div className="card">
										<div className="card-header">
											<LinkContainer to="/">
												<div>Question List</div>
											</LinkContainer>
										</div>
									</div>
									<div className="card">
										<div className="card-header">
											<LinkContainer to="/login">
												<div>Login</div>
											</LinkContainer>
										</div>
									</div>
								</div>
							)}
						</div>
					</nav>
					<div id="sidenav_rgt" style={{ marginLeft: '250px' }}>
						<div className="container-fluid">
							<span className="sidebar_icon">
								<ul className="left-navbar">
									<Search />
								</ul>
								<ul className="right-navbar">
									<li>
										<a href="#" className="icon-circle">
											<i className="fa fa-envelope-o" />
											<span className="badge badge-danger">5</span>
										</a>
									</li>
									<li>
										<a href="#" className="icon-circle">
											<i className="fa fa-bell-o" />
											<span className="badge badge-success">6</span>
										</a>
									</li>
								</ul>
							</span>
						</div>
					</div>
				</div>
				<div id="menu_feature" style={{ marginLeft: '250px' }}>
					<div className="bg-content">
						<div className="container-fluid">
							<div className="content-title con-title_txt">
								<div className="inner-content in_txt">
									<div className="container-fluid">
										<div>
											<Switch>
												<Route exact path="/" render={() => <QuestionList userId={id} />} />

												<Route
													exact
													path="/createQuestion"
													render={() => <CreateQuestion userId={id} signedIn={signedIn} credits={credits} user={this.props.user}/>}
												/>
												<Route
													exact
													path="/login"
													render={() => {
														{
                              console.log(signedIn)
															if (!signedIn) {
                                console.log('here in ELSE MAIN')
																return (
																	<Login
																		uiConfig={this.props.uiConfig}
																		firebaseAuth={this.props.firebaseAuth}
																	/>
																);
															} 
																if (!username) {
																	return (
																		<UsernameSubmit
																			email={email}
																			setUser={this.props.setUser}
																		/>
																	);
																}
																return <Redirect to="/" />;
															
														}
													}}
												/>
												<Route
													exact
													path="/profileUser"
													render={() => {
														return <ProfileUser id={id} />;
													}}
												/>
												<Route
													exact
													path="/questionContent/:questionId"
													render={({ match }) => {
														return (
															<QuestionContent
															  loggedId={id}
																user={this.props.user}
																id={match.params.questionId}
															/>
														);
													}}
												/>
												<Route
                          exact
                          path="/search/:term"
                          render={({ match }) => {
                            return (
                              <SearchList
                                userId={id}
                                term={match.params.term}
                                user={this.props.user}
                              />
                            );
                          }}
                        />
											</Switch>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Main;
