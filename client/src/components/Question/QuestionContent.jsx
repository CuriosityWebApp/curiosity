import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getQuestion } from '../../queries/queries.js';
import { QuestionLike, QuestionDislike } from '../../mutations/mutations.js';

import { Link } from 'react-router-dom';
import AnswerList from '../Answer/AnswerList.jsx';
import moment from 'moment';
import ProfileSmallPage from '../PublicProfile/ProfileSmallPage.jsx';
import _ from 'lodash';
import ReactTooltip from 'react-tooltip';

class QuestionContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerClicked: false,
    };
    this.IncrementLikes = this.IncrementLikes.bind(this);
    this.decrementLikes = this.decrementLikes.bind(this);
    this.throttledIcrement = _.throttle(this.IncrementLikes, 200, { leading: false }).bind(this);
    this.throttledDecrement = _.throttle(this.decrementLikes, 200, { leading: false }).bind(this);
    this.forceLogin = this.forceLogin.bind(this);
    this.displayUpButtonColor = this.displayUpButtonColor.bind(this);
    this.displayDownButtonColor = this.displayDownButtonColor.bind(this);
  }
  componentDidMount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  forceLogin(e) {
    if (!this.props.loggedId) {
      this.props.notify('error', 'You must be logged in to view this profile.');
    }
  }

  IncrementLikes(e) {
    if (!this.props.loggedId) {
      this.props.notify('error', 'You must log in first!');
    } else {
      let up, down, data;
      let userId = this.props.loggedId;

      if (this.props.data.loading) {
        console.log('loading questions..');
      } else {
        data = this.props.data.question;
        up = new Set(data.ratedUpBy);
        down = new Set(data.ratedDownBy);
        if (up.has(userId)) {
          this.props
            .QuestionLike({
              mutation: QuestionLike,
              variables: {
                id: data.id,
                userId: userId,
                method: 'delete',
              },
            })
            .then(() => {
              this.props.data.refetch();
            });
        } else if (!up.has(userId) && !down.has(userId)) {
          this.props
            .QuestionLike({
              mutation: QuestionLike,
              variables: {
                id: data.id,
                userId: userId,
                method: 'add',
              },
            })
            .then(() => {
              this.props.data.refetch();
            });
        }
      }
    }
  }

  decrementLikes(e) {
    if (!this.props.loggedId) {
      this.props.notify('error', 'You must log in first!');
    } else {
      let up, down, data;
      let userId = this.props.loggedId;

      if (this.props.data.loading) {
        console.log('loading questions..');
      } else {
        data = this.props.data.question;
        up = new Set(data.ratedUpBy);
        down = new Set(data.ratedDownBy);
        if (down.has(userId)) {
          this.props
            .QuestionDislike({
              mutation: QuestionDislike,
              variables: {
                id: data.id,
                userId: userId,
                method: 'delete',
              },
            })
            .then(() => {
              this.props.data.refetch();
            });
        } else if (!up.has(userId) && !down.has(userId)) {
          this.props
            .QuestionDislike({
              mutation: QuestionDislike,
              variables: {
                id: data.id,
                userId: userId,
                method: 'add',
              },
            })
            .then(() => {
              this.props.data.refetch();
            });
        }
      }
    }
  }

  displayUpButtonColor() {
    let data = this.props.data.question;
    let up = new Set(data.ratedUpBy);
    let userId = this.props.loggedId;
    return up.has(userId)
      ? 'fas fa-caret-up fa-3x centerAlign text-success'
      : 'fas fa-caret-up fa-3x centerAlign text-muted';
  }
  displayDownButtonColor() {
    let data = this.props.data.question;
    let down = new Set(data.ratedDownBy);
    let userId = this.props.loggedId;
    return down.has(userId)
      ? 'fas fa-caret-down fa-3x centerAlign text-danger'
      : 'fas fa-caret-down fa-3x centerAlign text-muted';
  }

  displayQuestionContent() {
    let { data } = this.props;
    let { question, loading, error } = data;
    if (data && loading) {
      return <div> Loading...</div>;
    }
    if (error) {
      return <div>Error...</div>;
    } else {
      let { question } = data;
      let hoverText;
      data.refetch();
      if (question) {
        hoverText = `Likes: ${question.ratedUpBy.length}, Dislikes: ${question.ratedDownBy.length}`;
      } else {
        hoverText = '';
      }
      return (
        <div className="list-group">
          <div className="container-fluid pt-3 pb-3 rounded  mr-15 ">
            <div className="row">
              <div className="col-sm-1 pt-5 d-flex align-items-center flex-column">
                <div>
                  <i
                    className={this.displayUpButtonColor()}
                    aria-hidden="true"
                    style={{
                      cursor: 'pointer',
                      display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      border: 'none',
                      background: 'none',
                    }}
                    onClick={this.throttledIcrement.bind(this)}
                  />
                </div>
                <div
                  style={{
                    textAlign: 'center',
                    fontSize: '1.5em',
                  }}
                >
                  <ReactTooltip effect="solid" />
                  <p data-tip={hoverText} style={{ margin: '0px', padding: '0px' }}>
                    {question.score}
                  </p>
                </div>
                <div>
                  <i
                    className={this.displayDownButtonColor()}
                    aria-hidden="true"
                    style={{
                      cursor: 'pointer',
                      display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      border: 'none',
                      background: 'none',
                    }}
                    onClick={this.throttledDecrement.bind(this)}
                  />
                </div>
              </div>
              <div className="col-md-11 ">
                <div className="card-header d-flex flex-row-reverse bg-transparent  pb-2 border-bottom-0">
                  {question.bountyPaid ? (
                    <span className="badge badge-pill badge-danger shadow"> Bounty Claimed </span>
                  ) : (
                    <span className="badge badge-pill badge-success shadow">
                      {' '}
                      Bounty Not Claimed{' '}
                    </span>
                  )}{' '}
                  <span className="badge badge-pill shadow" style={{ backgroundColor: '#F7CE3E' }}>
                    {' '}
                    <i className="fas fa-lock" /> {question.restriction}
                  </span>
                  <span className="badge badge-lg badge-pill badge-dark text-lg shadow">
                    <i className="fa fa-graduation-cap" />{' '}
                    {question.category ? question.category : 'None'}
                  </span>{' '}
                  <span
                    className="badge badge-lg badge-pill badge-dark text-lg"
                    style={{
                      color: '#F7CE3E',
                    }}
                  >
                    <i
                      className="fas fa-ruble-sign  "
                      style={{
                        color: '#F7CE3E',
                      }}
                    />
                    {''} {''}
                    {question.bounty}
                  </span>{' '}
                </div>
                <div className="card bg-white rounded qShadow">
                  <div className="row">
                    <div className="col-md-3">
                      <Link
                        to={!this.props.loggedId ? '/login' : `/user/${question.user.id}`}
                        style={{ textDecoration: 'none', color: 'black' }}
                        onClick={this.forceLogin}
                      >
                        <ProfileSmallPage userId={question.user.id} />
                      </Link>
                    </div>
                    <div className="col-md-9 p-3" style={{ color: 'black' }}>
                      <div className="card-block">
                        <h3 className="card-title font-weight-bold d-flex flex-row justify-content-between mr-5">
                          {' '}
                          Question: {''}
                          {question.questionTitle}
                        </h3>
                        <span
                          className="font-italic font-weight-light text-muted"
                          style={{
                            fontSize: '10px',
                          }}
                        >
                          Posted by {question.user.username} -{' '}
                          {moment(question.createdAt).fromNow()}{' '}
                        </span>
                        <div className="mx-0 my-1">
                          <hr className="mx-0 my-1" />
                        </div>
                        <div>
                          <p className="mr-5">{question.questionContent}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer d-flex flex-row-reverse bg-transparent pb-0">
                  {question.tags.map(tag => {
                    return (
                      <span className="badge-md" key={tag}>
                        <i className="fas fa-tags" style={{ color: '#217CA3' }} /> <u>{tag}</u>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="mx-0 my-1">
              <hr className="mx-0 my-1" />
            </div>
          </div>
          <div>
            <AnswerList
              id={this.props.id}
              qOwnerId={question.user.id}
              loggedId={this.props.loggedId}
              isPaid={question.bountyPaid}
              bounty={question.bounty}
              user={this.props.user}
              questionId={this.props.id}
              signedIn={this.props.signedIn}
              notify={this.props.notify}
              forceLogin={this.props.forceLogin}
              refetchAnswerList={this.props.data.refetch}
            />
          </div>
        </div>
      );
    }
  }
  render() {
    return this.displayQuestionContent();
  }
}

export default compose(
  graphql(getQuestion, {
    options: props => {
      return {
        variables: {
          id: props.id,
        },
      };
    },
  }),
  graphql(QuestionLike, { name: 'QuestionLike' }),
  graphql(QuestionDislike, { name: 'QuestionDislike' }),
)(QuestionContent);
