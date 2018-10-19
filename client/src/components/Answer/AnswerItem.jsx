import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import { getAnswer } from '../../queries/queries.js';
import moment from 'moment';
import {
  AnswerLike,
  AnswerDislike,
  UpdateCredit,
  AddTransaction,
  AddMessage,
} from '../../mutations/mutations.js';
import ProfileSmallPage from '../PublicProfile/ProfileSmallPage.jsx';
import AnswerChoice from './AnswerChoice.jsx';
import _ from 'lodash';
import ReactTooltip from 'react-tooltip';

class AnswerItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.report = this.report.bind(this);
    this.throttledIcrement = _.throttle(this.IncrementLikes, 200, { leading: false });
    this.throttledDecrement = _.throttle(this.decrementLikes, 200, { leading: false });
    this.forceLogin = this.forceLogin.bind(this);
    this.displayUpButtonColor = this.displayUpButtonColor.bind(this);
    this.displayDownButtonColor = this.displayDownButtonColor.bind(this);
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
      if (this.props.getAnswer.loading) {
        console.log('still loading');
      } else {
        data = this.props.getAnswer;
        up = new Set(data.answer.ratedUpBy);
        down = new Set(data.answer.ratedDownBy);
        if (up.has(userId)) {
          this.props
            .AnswerLike({
              mutation: AnswerLike,
              variables: {
                id: data.answer.id,
                userId: userId,
                method: 'delete',
              },
            })
            .then(() => {
              this.props.getAnswer.refetch();
            });
        } else if (!up.has(userId) && !down.has(userId)) {
          this.props
            .AnswerLike({
              mutation: AnswerLike,
              variables: {
                id: data.answer.id,
                userId: userId,
                method: 'add',
              },
            })
            .then(() => {
              this.props.getAnswer.refetch();
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
      if (this.props.getAnswer.loading) {
        console.log('still loading');
      } else {
        data = this.props.getAnswer;
        up = new Set(data.answer.ratedUpBy);
        down = new Set(data.answer.ratedDownBy);

        if (down.has(userId)) {
          this.props
            .AnswerDislike({
              mutation: AnswerDislike,
              variables: {
                id: data.answer.id,
                userId: userId,
                method: 'delete',
              },
            })
            .then(() => {
              this.props.getAnswer.refetch();
            });
        } else if (!up.has(userId) && !down.has(userId)) {
          this.props
            .AnswerDislike({
              mutation: AnswerDislike,
              variables: {
                id: data.answer.id,
                userId: userId,
                method: 'add',
              },
            })
            .then(() => {
              this.props.getAnswer.refetch();
            });
        }
      }
    }
  }
  displayUpButtonColor() {
    let data = this.props.getAnswer.answer;
    let up = new Set(data.ratedUpBy);
    let userId = this.props.loggedId;
    return up.has(userId)
      ? 'fas fa-caret-up fa-3x centerAlign text-success'
      : 'fas fa-caret-up fa-3x centerAlign text-muted';
  }
  displayDownButtonColor() {
    let data = this.props.getAnswer.answer;
    let down = new Set(data.ratedDownBy);
    let userId = this.props.loggedId;
    return down.has(userId)
      ? 'fas fa-caret-down fa-3x centerAlign text-danger'
      : 'fas fa-caret-down fa-3x centerAlign text-muted';
  }

  displayAnswer() {
    if (this.props.getAnswer && this.props.getAnswer.loading) {
      return <div>Loading answers...</div>;
    } else {
      let data = this.props.getAnswer;
      let hoverText = `Likes: ${data.answer.ratedUpBy.length}, Dislikes: ${
        data.answer.ratedDownBy.length
      }`;
      return (
        <React.Fragment>
          <div className="container-fluid pt-1 pb-3 rounded  mr-15 ">
            <div className="row">
              <div className="col-sm-1 p-3 d-flex align-items-center flex-column">
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
                    {data.answer.score}
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
                <div className="card shadow bg-white rounded">
                  <div className="row">
                    <div className="col-md-3">
                      <Link
                        to={!this.props.loggedId ? '/login' : `/user/${data.answer.user.id}`}
                        style={{ textDecoration: 'none', color: 'black' }}
                        onClick={this.forceLogin}
                      >
                        <div>
                          <ProfileSmallPage userId={data.answer.user.id} />
                        </div>
                      </Link>
                    </div>
                    <div className="col-md-9 p-3">
                      <div className="card-block">
                        <h3 className="card-title font-weight-bold d-flex flex-row justify-content-between mr-5">
                          {' '}
                          Re: {this.props.getAnswer.answer.question.questionTitle}
                          <AnswerChoice
                            questionId={this.props.questionId}
                            bounty={this.props.bounty}
                            qOwnerId={this.props.qOwnerId}
                            answerId={this.props.answerId}
                            loggedId={this.props.loggedId}
                            isPaid={this.props.isPaid}
                            refetchAnswerList={this.props.refetchAnswerList}
                          />
                        </h3>
                        <span
                          className="font-italic font-weight-light text-muted"
                          style={{
                            fontSize: '10px',
                          }}
                        >
                          Posted by {data.answer.user.username} -{' '}
                          {moment(data.answer.createdAt).fromNow()}{' '}
                        </span>
                        <div className="mx-0 my-1">
                          <hr className="mx-0 my-1" />
                        </div>
                        <div>
                          <p className="mr-5">{data.answer.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer d-flex flex-row-reverse bg-transparent pb-0">
                  <button
                    type="button"
                    className="fas fa-exclamation-triangle btn btn-danger shadow"
                    onClick={this.report}
                  >
                    {' '}
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
  report() {
    let messageTitle = 'REPORT: AnswerId:' + this.props.answerId;
    let data = this.props.getAnswer.answer;
    let messageContent =
      'User: ' + data.user.username + '\nQuestionTitle: ' + data.question.questionTitle;
    this.props
      .AddMessage({
        mutation: AddMessage,
        variables: {
          senderId: this.props.loggedId,
          receiverId: process.env.ADMINID,
          messageTitle: messageTitle,
          messageContent: messageContent,
        },
      })
      .then(() => {
        this.props.notify('error', 'Report submitted!');
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return <div>{this.displayAnswer()}</div>;
  }
}

export default compose(
  graphql(getAnswer, {
    name: 'getAnswer',
    options: props => {
      return {
        variables: {
          id: props.answerId,
        },
      };
    },
  }),
  graphql(AnswerLike, { name: 'AnswerLike' }),
  graphql(AnswerDislike, { name: 'AnswerDislike' }),
  graphql(UpdateCredit, { name: 'UpdateCredit' }),
  graphql(AddTransaction, { name: 'AddTransaction' }),
  graphql(AddMessage, { name: 'AddMessage' }),
)(AnswerItem);

/*


*/
