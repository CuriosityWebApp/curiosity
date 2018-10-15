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
  }

  render() {
    let {
      signedIn,
      user,
      handleLogout,
      notify,
      email,
      uiConfig,
      firebaseAuth,
      refetch,
    } = this.props;
    if (signedIn) {
      var { username, credit, id } = user;
    } else {
      var username = '';
      var credit = 0;
      var id = '';
    }
    return (
      <div>
        <NavBar
          user={user}
          signedIn={signedIn}
          uiConfig={this.uiConfig}
          handleLogout={handleLogout}
        />
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
                          render={() => <QuestionList userId={id} notify={notify} />}
                        />
                        <Route
                          exact
                          path="/createQuestion"
                          render={() => (
                            <CreateQuestion
                              userId={id}
                              signedIn={signedIn}
                              credit={credit}
                              user={user}
                              notify={notify}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/login"
                          render={() => {
                            {
                              if (!signedIn) {
                                if (email && !username) {
                                  return <UsernameSubmit email={email} />;
                                }
                                return <Login uiConfig={uiConfig} firebaseAuth={firebaseAuth} />;
                              } else {
                                setTimeout(() => {
                                  notify('auth', 'Signed In');
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
                            return <ProfileUser id={id} notify={notify} refetch={refetch} />;
                          }}
                        />
                        <Route
                          exact
                          path="/questionContent/:questionId"
                          render={({ match }) => {
                            return (
                              <QuestionContent
                                notify={notify}
                                signedIn={signedIn}
                                loggedId={id}
                                user={user}
                                id={match.params.questionId}
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
                                notify={notify}
                              />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/user/:id"
                          render={({ match }) => {
                            return (
                              <ProfileFullPage
                                userId={match.params.id}
                                username={user.username}
                                notify={notify}
                              />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/privatemessage/:username"
                          render={({ match }) => (
                            <PrivateMessage
                              userId={id}
                              username={match.params.username}
                              notify={notify}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/notifications"
                          render={() => {
                            return (
                              <Notifications
                                userId={id}
                                user={user}
                                refetch={refetch}
                                notify={notify}
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
