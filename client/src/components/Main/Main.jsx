import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import QuestionList from '../Question/QuestionList.jsx';
import CreateQuestion from '../Question/CreateQuestion.jsx';
import QuestionContent from '../Question/QuestionContent.jsx';
import UsernameSubmit from '../Auth/UsernameSubmit.jsx';
import ProfileFullPage from '../PublicProfile/ProfileFullPage.jsx';
import Login from '../Auth/Login.jsx';
import ProfileUser from '../User/ProfileUser.jsx';
import NavBar from './NavBar.jsx';
import SearchList from '../Search/SearchList.jsx';
import MessagesAndCreate from '../Messages/MessagesAndCreate.jsx';
import PrivateMessage from '../Messages/PrivateMessage.jsx';
import Notifications from '../Notifications/Notifications.jsx';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var signedIn = this.props.signedIn;
    if (signedIn) {
      var { username, credit, id } = this.props.user;
    } else {
      var username = '';
      var credit = 0;
      var id = '';
    }
    return (
      <div>
        <NavBar
          user={this.props.user}
          signedIn={signedIn}
          uiConfig={this.uiConfig}
          handleLogout={this.props.handleLogout}
        />
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
                          render={() => (
                            <CreateQuestion
                              userId={id}
                              signedIn={signedIn}
                              credit={credit}
                              user={this.props.user}
                              notify={this.props.notify}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/login"
                          render={() => {
                            {
                              if (!signedIn) {
                                if (this.props.email && !username) {
                                  return <UsernameSubmit email={this.props.email} />;
                                }
                                return (
                                  <Login
                                    uiConfig={this.props.uiConfig}
                                    firebaseAuth={this.props.firebaseAuth}
                                  />
                                );
                              } else {
                                setTimeout(() => {
                                  this.props.notify('auth', 'Signed In');
                                }, 0);
                                return <Redirect to="/" />;
                              }
                            }
                          }}
                        />
                        <Route
                          exact
                          path="/profileUser"
                          render={() => {
                            return (
                              <ProfileUser
                                id={id}
                                refetcher={this.props.refetcher}
                                notify={this.props.notify}
                              />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/questionContent/:questionId"
                          render={({ match }) => {
                            return (
                              <QuestionContent
                                signedIn={signedIn}
                                loggedId={id}
                                user={this.props.user}
                                id={match.params.questionId}
                                notify={this.props.notify}
                              />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/search/:term"
                          render={({ match }) => {
                            return <SearchList term={match.params.term} />;
                          }}
                        />
                        <Route
                          exact
                          path="/messages/:folder"
                          render={({ match }) => {
                            return (
                              <MessagesAndCreate
                                folder={match.params.folder}
                                userId={id}
                                notify={this.props.notify}
                              />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/user/:id"
                          render={({ match }) => {
                            return <ProfileFullPage userId={match.params.id} />;
                          }}
                        />
                        <Route
                          exact
                          path="/privatemessage"
                          render={() => <PrivateMessage userId={id} notify={this.props.notify} />}
                        />
                        <Route
                          exact
                          path="/notifications"
                          render={() => {
                            return (
                              <Notifications
                                userId={id}
                                user={this.props.user}
                                refetcher={this.props.refetcher}
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
