import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { getQuestions } from '../../queries/queries.js';
import _ from 'lodash';
import QuestionItem from '../Question/QuestionItem.jsx';
import QuestionNavBar from '../Question/QuestionNavBar.jsx';
import NavBar from './NavBar.jsx';
import { Switch, Route, Redirect } from 'react-router-dom';
import CreateQuestion from '../Question/CreateQuestion.jsx';
import QuestionContent from '../Question/QuestionContent.jsx';
import UsernameSubmit from '../Auth/UsernameSubmit.jsx';
import ProfileFullPage from '../PublicProfile/ProfileFullPage.jsx';
import Login from '../Auth/Login.jsx';
import ProfileUser from '../User/ProfileUser.jsx';
import SearchList from '../Search/SearchList.jsx';
import MessagesAndCreate from '../Messages/MessagesAndCreate.jsx';
import Notifications from '../Notifications/Notifications.jsx';

class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skip: 0,
      questions: [],
      filterBy: '',
      sortBy: '',
      range: null,
    };
    this.onScroll = this.onScroll.bind(this);
    this.getNextQuestions = this.getNextQuestions;
    this.throttledQuestionCall = _.throttle(
      this.getNextQuestions,
      this.state.sortBy === 'top' ? 700 : 500,
      {
        leading: false,
      },
    ).bind(this);
    this.filterQuestions = this.filterQuestions.bind(this);
    this.sortQuestions = this.sortQuestions.bind(this);
    this.removeScroll = this.removeScroll.bind(this);
    this.addScroll = this.addScroll.bind(this);
  }
  componentDidMount() {
    this.throttledQuestionCall();
    this.addScroll();
  }

  componentWillUnmount() {
    this.removeScroll();
  }

  onScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 400 &&
      this.state.questions.length
    ) {
      window.removeEventListener('scroll', this.onScroll, false);
      this.throttledQuestionCall();
    }
  };

  removeScroll() {
    window.removeEventListener('scroll', this.onScroll, false);
  }
  addScroll() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  sortQuestions = async (e, method, range) => {
    await this.setState({ sortBy: method, skip: 0, questions: [], range: range }, () => {
      this.props.client
        .query({
          query: getQuestions,
          variables: {
            limit: 15,
            skip: this.state.skip,
            filter: this.state.filterBy,
            sortBy: this.state.sortBy,
            range: this.state.range,
            userId: this.props.userId,
          },
        })
        .then(({ data }) => {
          let newQuestions = this.state.questions.concat(data.questions);
          this.setState({ questions: newQuestions, skip: this.state.skip + 15 });
          window.addEventListener('scroll', this.onScroll, false);
        });
    });
  };

  filterQuestions = async (e, category, range) => {
    // e.stopPropagation();
    await this.setState({ filterBy: category, skip: 0, questions: [], range: range }, () => {
      this.props.client
        .query({
          query: getQuestions,
          variables: {
            limit: 15,
            skip: this.state.skip,
            filter: this.state.filterBy,
            sortBy: this.state.sortBy,
            range: this.state.range,
            userId: this.props.userId,
          },
        })
        .then(({ data }) => {
          let newQuestions = this.state.questions.concat(data.questions);

          this.setState({ questions: newQuestions, skip: this.state.skip + 15 });
          window.addEventListener('scroll', this.onScroll, false);
        });
    });
  };

  getNextQuestions = async () => {
    await this.props.client
      .query({
        query: getQuestions,
        variables: {
          limit: 15,
          skip: this.state.skip,
          filter: this.state.filterBy,
          sortBy: this.state.sortBy,
          range: this.state.range,
          userId: this.props.userId,
        },
      })
      .then(({ data }) => {
        let newProps = this.state.questions.concat(data.questions);
        let next;
        data.questions.length
          ? (next = this.state.skip + 15)
          : (next = this.state.questions.length);
        this.setState({ questions: newProps, skip: next }, () => {});
      })
      .then(() => window.addEventListener('scroll', this.onScroll, false))
      .catch(err => console.log('error in nextquestions', err));
  };

  displayQuestions() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    } else {
      if (this.state.sortBy === 'recommendation' && !this.state.questions.length) {
        return <h3> No recommendation found</h3>;
      } else {
        let data =
          this.state.questions.length > 0 ? this.state.questions : this.props.data.questions;
        return data.map(post => {
          return (
            <QuestionItem
              filter={this.filterQuestions}
              key={post.id}
              questionId={post.id}
              onSelect={this.onSelect}
              userId={this.props.userId}
              notify={this.props.notify}
            />
          );
        });
      }
    }
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
    let filter = this.state.filterBy ? (
      <span className="badge" style={{ backgroundColor: '#F7CE3E', fontSize: '13px' }}>
        {this.state.filterBy}
      </span>
    ) : (
      ''
    );
    let sorted = this.state.sortBy ? (
      this.state.sortBy !== 'createdAt' ? (
        <span className="badge" style={{ backgroundColor: '#F7CE3E', fontSize: '13px' }}>
          {this.state.sortBy}
        </span>
      ) : (
        <span className="badge" style={{ backgroundColor: '#F7CE3E', fontSize: '13px' }}>
          New first
        </span>
      )
    ) : (
      ''
    );
    let range = this.state.range ? (
      this.state.range > 1 ? (
        <span className="badge" style={{ backgroundColor: '#F7CE3E', fontSize: '13px' }}>
          {this.state.range} days
        </span>
      ) : (
        <span className="badge" style={{ backgroundColor: '#F7CE3E', fontSize: '13px' }}>
          Today
        </span>
      )
    ) : (
      <span className="badge" style={{ backgroundColor: '#F7CE3E', fontSize: '13px' }}>
        All time
      </span>
    );
    this.props.data.refetch();
    refetch();
    return (
      <React.Fragment>
        <div id="snb">
          <NavBar
            user={user}
            signedIn={signedIn}
            uiConfig={uiConfig}
            handleLogout={handleLogout}
            userId={id}
            notify={notify}
            refetch={refetch}
          />
          <div id="sidenav_rgt" style={{ marginLeft: '250px' }}>
            <div className="container-fluid" />
            <QuestionNavBar
              sortQuestions={this.sortQuestions}
              user={user}
              filterQuestions={this.filterQuestions}
              signedIn={signedIn}
            />
          </div>
        </div>
        <div id="menu_feature" style={{ marginLeft: '250px' }}>
          <h3
            className="badge my-1 ml-3 mr-2"
            style={{ backgroundColor: '#217CA3', color: 'white', fontSize: '14px' }}
          >
            Filtered by:{' '}
          </h3>{' '}
          {filter} {sorted} {range}
          <div />
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
                          render={() => {
                            this.addScroll();
                            return this.displayQuestions();
                          }}
                        />
                        <Route
                          exact
                          path="/createQuestion"
                          render={() => {
                            this.removeScroll();
                            return (
                              <CreateQuestion
                                userId={id}
                                signedIn={signedIn}
                                credit={credit}
                                user={user}
                                notify={notify}
                              />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/login"
                          render={() => {
                            {
                              if (!signedIn) {
                                this.removeScroll();
                                if (email && !username) {
                                  this.removeScroll();
                                  return <UsernameSubmit email={email} />;
                                }
                                return <Login uiConfig={uiConfig} firebaseAuth={firebaseAuth} />;
                              } else {
                                setTimeout(() => {
                                  notify('auth', 'Signed In');
                                }, 0);
                                this.removeScroll();
                                return <Redirect to="/" />;
                              }
                            }
                          }}
                        />
                        <Route
                          exact
                          path="/profileUser"
                          render={() => {
                            this.removeScroll();
                            return <ProfileUser id={id} notify={notify} refetch={refetch} />;
                          }}
                        />
                        <Route
                          exact
                          path="/questionContent/:questionId"
                          render={({ match }) => {
                            this.removeScroll();
                            return (
                              <QuestionContent
                                scrollRM={this.removeScroll}
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
                            this.addScroll();
                            return <SearchList term={match.params.term} />;
                          }}
                        />
                        <Route
                          exact
                          path="/messages/:folder"
                          render={({ match }) => {
                            this.removeScroll();
                            return (
                              <MessagesAndCreate
                                folder={match.params.folder}
                                userId={id}
                                notify={notify}
                                refetch={refetch}
                              />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/user/:id"
                          render={({ match }) => {
                            this.removeScroll();
                            return (
                              <ProfileFullPage
                                realUserId={id}
                                userId={match.params.id}
                                username={user.username}
                                notify={notify}
                                refetch={refetch}
                              />
                            );
                          }}
                        />
                        <Route
                          exact
                          path="/notifications"
                          render={() => {
                            this.removeScroll();
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
      </React.Fragment>
    );
  }
}

export default compose(
  withApollo,
  graphql(getQuestions, {
    options: props => {
      return {
        variables: {
          limit: 15,
          skip: 0,
          filter: '',
          sortBy: '',
          range: null,
          userId: props.userId,
        },
      };
    },
  }),
)(QuestionList);
