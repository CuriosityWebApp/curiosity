import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getUser } from '../../queries/queries.js';
import { AddVouch } from '../../mutations/mutations.js';
import ProfileQuestionList from './ProfileQuestionList.jsx';
import ProfileAnswerList from './ProfileAnswerList.jsx';
import PrivateMessage from '../Messages/PrivateMessage.jsx';
import Vouches from './Vouches.jsx';
import moment from 'moment';

class ProfileFullPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChosen: false,
      showAll: true,
      showComponent: false,
      receivername: '',
    };
    this.showChosenOnClick = this.showChosenOnClick.bind(this);
    this.showAllOnClick = this.showAllOnClick.bind(this);
    this.onClickAddVouch = this.onClickAddVouch.bind(this);
    this.onClickShowComponent = this.onClickShowComponent.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.replyFormat = this.replyFormat.bind(this);
  }

  onClickAddVouch(e) {
    let { AddVouch, userId, username, notify, getUser } = this.props;
    let value;
    if (e.target.value === 'Nevermind') {
      value = false;
    } else {
      value = true;
    }
    AddVouch({
      variables: {
        id: userId,
        vouch: username,
        add: value,
      },
    })
      .then(() => {
        if (value === false) {
          notify('error', 'Removed Vouch!');
        } else {
          notify('success', 'Added Vouch!');
        }
        getUser.refetch();
      })
      .catch(err => console.error(err));
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
  onClickShowComponent() {
    this.setState({
      showComponent: true,
    });
  }

  handleClose() {
    this.setState({ showComponent: false });
  }

  replyFormat() {
    this.setState({
      receiverName: this.props.getUser.user.username,
      showComponent: true,
    });
  }

  render() {
    const { showComponent } = this.state;

    let { username, userId } = this.props;
    let { loading, error, user } = this.props.getUser;
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error...</div>;
    } else {
      return (
        <div>
          {showComponent && (
            <PrivateMessage
              userId={userId}
              notify={this.props.notify}
              showComponent={this.state.showComponent}
              handleClose={this.handleClose}
              receiverName={this.state.receiverName}
            />
          )}
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card shadow rounded">
                  <div className="card-header headerColor text-white">
                    <i className="fas fa-trophy" />
                    <span onClick={this.showAllOnClick} style={{ cursor: 'pointer' }}>
                      {' '}
                      Answers
                      {'  '}|{'  '}
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
                <div className="card shadow rounded">
                  <div className="card-header headerColor text-white">
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
                <div className="card shadow rounded bg-light mb-3">
                  <div className="card-header headerColor text-white">
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
                    <hr />
                    <div>
                      <b>{user.username}</b>
                    </div>
                    <div>Experience {user.rank}</div>
                    <div>
                      <em>Member Since</em> {moment(user.createdAt).format('LL')}
                    </div>
                    <hr />
                    <br />
                    <button
                      type="button"
                      className="btn successBtn marigold"
                      onClick={this.replyFormat}
                    >
                      Send Message
                    </button>
                    <br />
                    <div>
                      <button
                        style={{
                          margin: '20px',
                        }}
                        type="button"
                        className="btn successBtn marigold"
                        value={user.vouch.includes(username) ? 'Nevermind' : 'Vouch This Person!!'}
                        onClick={this.onClickAddVouch}
                      >
                        {user.vouch.includes(username) ? 'Nevermind' : 'Vouch This Person!!'}
                      </button>
                    </div>
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
