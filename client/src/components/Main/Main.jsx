import React, { Component } from 'react';
import { Query, graphql } from 'react-apollo';
import { BrowserRouter, Switch, Router, Route, NavLink, Redirect } from 'react-router-dom';
import QuestionList from '../Question/QuestionList.jsx';
import CreateQuestion from '../Question/CreateQuestion.jsx';
import QuestionContent from '../Question/QuestionContent.jsx';
import UsernameSubmit from '../Auth/UsernameSubmit.jsx';
import Login from '../Auth/Login.jsx';
import ProfileUser from '../User/ProfileUser.jsx';
import Search from './Search.jsx';
import { checkUserEmail } from '../../queries/queries.js';
//navigation
import { LinkContainer } from 'react-router-bootstrap';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div id="snb">
          <nav id="mysidenav_lft" className="sidenav" style={{ width: '250px' }}>
            <a className="graduation">
              <span className="pl-2">Curiosity</span>
            </a>
            <div className="profile-box">
              {this.props.oAuthData ? (
                <div className="media">
                  <a className="pull-left pt-2">
                    <img className="rounded-circle" src="http://via.placeholder.com/40x40" />
                  </a>
                  <div className="media-body">
                    <h5 className="media-heading">
                      Welcome <span>Bear</span>
                    </h5>
                    <small>500 Credits</small>
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
              {this.props.oAuthData ? (
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
                      <LinkContainer to="/">
                        <div
                          onClick={e => {
                            e.preventDefault();
                            this.props.logout();
                          }}
                        >
                          Log Out
                        </div>
                      </LinkContainer>
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
                  <Search userId={this.props.userId} />
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
                        <Route
                          exact
                          path="/"
                          render={() => <QuestionList userId={this.props.userId} />}
                        />

                        <Route
                          exact
                          path="/createQuestion"
                          render={() => (
                            <CreateQuestion
                              userId={this.props.userId}
                              signedIn={this.props.signedIn}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/login"
                          render={() => {
                            {
                              if (!this.props.oAuthData) {
                                return (
                                  <Login
                                    uiConfig={this.props.uiConfig}
                                    firebaseAuth={this.props.firebaseAuth}
                                  />
                                );
                              } else {
                                return (
                                  <Query
                                    query={checkUserEmail}
                                    variables={{ email: this.props.oAuthData.email }}
                                    fetchPolicy="no-cache"
                                  >
                                    {({ loading, error, data }) => {
                                      if (loading) {
                                        return <p>Loading...</p>;
                                      }
                                      if (error) {
                                        return <p>{error}</p>;
                                      }
                                      if (!data.checkUserEmail) {
                                        return (
                                          <UsernameSubmit
                                            email={this.props.oAuthData.email}
                                            handleUserId={this.handleUserId}
                                          />
                                        );
                                      } else {
                                        this.setState({
                                          userId: data.checkUserEmail.id,
                                        });
                                        return <Redirect to="/" />;
                                      }
                                    }}
                                  </Query>
                                );
                              }
                            }
                          }}
                        />
                        <Route
                          exact
                          path="/profileUser"
                          render={() => {
                            return <ProfileUser id={this.props.userId} />;
                          }}
                        />
                        <Route
                          exact
                          path="/questionContent/:questionId"
                          render={({ match }) => {
                            return (
                              <QuestionContent
                                userId={this.props.userId}
                                id={match.params.questionId}
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
