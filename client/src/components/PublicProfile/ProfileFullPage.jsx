import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getUser } from '../../queries/queries.js';
import { AddVouch } from '../../mutations/mutations.js';
import { Link } from 'react-router-dom';
import ProfileQuestionList from './ProfileQuestionList.jsx';
import ProfileAnswerList from './ProfileAnswerList.jsx';
import Vouches from './Vouches.jsx';
import moment from 'moment';

class ProfileFullPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChosen: false,
      showAll: true,
    };
    this.showChosenOnClick = this.showChosenOnClick.bind(this);
    this.showAllOnClick = this.showAllOnClick.bind(this);
    this.onClickAddVouch = this.onClickAddVouch.bind(this);
  }

  onClickAddVouch() {
    this.props
      .AddVouch({
        variables: {
          id: this.props.userId,
          vouch: this.props.username,
        },
      })
      .then(() => this.props.getUser.refetch());
  }

  showChosenOnClick() {
    this.setState({
      showChosen: true,
      showAll: false,
    });
  }

  showAllOnClick() {
    this.setState({
      showChosen: false,
      showAll: true,
    });
  }

  render() {
    console.log(this.props, 'I AM PROPS');
    let { loading, error, user } = this.props.getUser;
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error...</div>;
    } else {
      return (
        <div>
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header bg-primary text-white">
                    <i className="fas fa-trophy" />
                    <span onClick={this.showAllOnClick} style={{ cursor: 'pointer' }}>
                      {' '}
                      Answers{' '}
                    </span>
                    <span onClick={this.showChosenOnClick} style={{ cursor: 'pointer' }}>
                      Chosen{' '}
                    </span>
                  </div>
                  <div
                    className="card-body well well-sm pre-scrollable"
                    style={{ maxHeight: '55vh' }}
                  >
                    <div>
                      {user.answers.map(answer => {
                        if (answer.answerChosen && this.state.showChosen) {
                          return (
                            <ProfileAnswerList
                              answer={answer}
                              username={user.username}
                              key={answer.id}
                            />
                          );
                        }

                        if (this.state.showAll) {
                          return (
                            <ProfileAnswerList
                              answer={answer}
                              username={user.username}
                              key={answer.id}
                            />
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
                <br />
                <div className="card">
                  <div className="card-header bg-primary text-white">
                    <i className="fa fa-question-circle" /> Questions
                  </div>
                  <div
                    className="card-body well well-sm pre-scrollable"
                    style={{ maxHeight: '55vh' }}
                  >
                    <div>
                      {user.questions.map(question => {
                        return (
                          <ProfileQuestionList
                            question={question}
                            username={user.username}
                            key={question.id}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <div className="card bg-light mb-3">
                  <div className="card-header bg-success text-white">
                    <i className="fa fa-user" /> User
                  </div>
                  <div
                    className="card-body"
                    style={{
                      display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      textAlign: 'center',
                    }}
                  >
                    <img
                      src={user.avatarUrl}
                      className="rounded-circle"
                      style={{ width: '160px', height: '160px' }}
                    />
                    <div>{user.username}</div>
                    <div>Likes: {user.rank}</div>
                    <div>Member Since {moment(user.createdAt).format('LL')}</div>
                    <br />
                    <Link to={`/privatemessage`}>
                      <button type="button" className="btn btn-outline-primary">
                        Send Message
                      </button>
                    </Link>
                    <br />
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={this.onClickAddVouch}
                    >
                      Vouch This Person!!
                    </button>
                  </div>
                </div>
                <Vouches vouch={user.vouch} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default compose(
  graphql(getUser, {
    name: 'getUser',
    options: props => {
      return {
        variables: {
          id: props.userId,
        },
      };
    },
  }),
  graphql(AddVouch, { name: 'AddVouch' }),
)(ProfileFullPage);
