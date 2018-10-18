import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import { compose, graphql } from 'react-apollo';
import { getQuestion } from '../../queries/queries.js';
import {
  QuestionLike,
  QuestionDislike,
  IncrementQuestionViews,
} from '../../mutations/mutations.js';

import _ from 'lodash';

class QuestionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
    this.IncrementLikes = this.IncrementLikes.bind(this);
    this.decrementLikes = this.decrementLikes.bind(this);
    this.throttledIcrement = _.throttle(this.IncrementLikes, 200, { leading: false }).bind(this);
    this.throttledDecrement = _.throttle(this.decrementLikes, 200, { leading: false }).bind(this);
    this.OpenQuestion = this.OpenQuestion.bind(this);
    this.displayUpButtonColor = this.displayUpButtonColor.bind(this);
    this.displayDownButtonColor = this.displayDownButtonColor.bind(this);
  }

  IncrementLikes(e) {
    if (!this.props.userId) {
      this.props.notify('error', 'You must log in first!');
    } else {
      let up, down, data;
      let userId = this.props.userId;

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
    if (!this.props.userId) {
      this.props.notify('error', 'You must log in first!');
    } else {
      let up, down, data;
      let userId = this.props.userId;

      if (this.props.data.loading) {
        console.log('loading questions..');
      } else {
        data = this.props.data.question;
        up = new Set(data.ratedUpBy);
        down = new Set(data.ratedDownBy);
        if (down.has(userId)) {
          this.props.QuestionDislike({
            mutation: QuestionDislike,
            variables: {
              id: data.id,
              userId: userId,
              method: 'delete',
            },
          });
          then(() => {
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
  OpenQuestion() {
    let id = this.props.data.question.id;
    this.setState({ selected: id }, () => {
      this.props
        .IncrementQuestionViews({
          mutation: IncrementQuestionViews,
          variables: {
            id: id,
          },
        })
        .then(() => this.props.data.refetch());
    });
  }
  displayUpButtonColor() {
    let data = this.props.data.question;
    let up = new Set(data.ratedUpBy);
    let userId = this.props.userId;
    return up.has(userId)
      ? 'fas fa-caret-up fa-3x centerAlign text-success'
      : 'fas fa-caret-up fa-3x centerAlign text-muted';
  }
  displayDownButtonColor() {
    let data = this.props.data.question;
    let down = new Set(data.ratedDownBy);
    let userId = this.props.userId;
    return down.has(userId)
      ? 'fas fa-caret-down fa-3x centerAlign text-danger'
      : 'fas fa-caret-down fa-3x centerAlign text-muted';
  }
  render() {
    if (!this.state.selected) {
      if (this.props.data && this.props.data.loading) {
        return <div> Loading...</div>;
      } else {
        let data = this.props.data.question;
        let hoverText = `Likes: ${data.ratedUpBy.length}, Dislikes: ${data.ratedDownBy.length}`;
        return (
          <div className="list-group ">
            <div className="container-fluid rounded  mr-15 ">
              <div className="row">
                <div className="col-sm-1 d-flex align-items-center flex-column mt-4">
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
                      onClick={this.throttledIcrement}
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
                      {data.score}
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
                      onClick={this.throttledDecrement}
                    />
                  </div>
                </div>
                <div
                  className="col-md-11 "
                  style={{ cursor: 'pointer' }}
                  onClick={this.OpenQuestion}
                >
                  <div className="card-header d-flex flex-row-start bg-transparent pl-0 pb-0 border-bottom-0">
                    <h4 className="badge  badge-dark   mx-1 shadow-lg " style={{ margin: '1px' }}>
                      <i className="fas fa-eye " /> {data.views}
                    </h4>
                    <h4 className="badge  badge-dark shadow-lg" style={{ margin: '1px' }}>
                      <i className="fas fa-comment" /> {data.answers.length}
                    </h4>
                  </div>
                  <div className="card bg-white rounded shadow">
                    <div className="row">
                      <div className="col-md-9 ">
                        <div className="card-block pl-3 pt-2">
                          <h3 className="card-title font-weight-bold d-flex flex-row ml-2 mb-0">
                            {' '}
                            {data.questionTitle}
                          </h3>
                          <span
                            className="font-italic font-weight-light text-muted "
                            style={{
                              fontSize: '10px',
                            }}
                          >
                            Asked by {data.user.username} - {moment(data.createdAt).fromNow()}{' '}
                          </span>
                          <div className="mx-0 my-1">
                            <hr className="mx-0 my-1" />
                          </div>
                          <div>
                            <p>
                              {data.questionContent.length > 200
                                ? data.questionContent.slice(0, 200) + ' ...'
                                : data.questionContent}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 " style={{ color: 'black' }}>
                        <div className="card-block d-flex align-items-start flex-column ">
                          <button
                            className="btn btn-block  btn-dark text-lg mt-0 mb-1 shadow-lg "
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
                            {data.bounty}
                          </button>{' '}
                          <button className="btn btn-block  btn-dark text-lg shadow-lg my-1 border-0 ">
                            <i className="fa fa-graduation-cap" />
                            {data.category ? data.category : 'None'}
                          </button>
                          <button
                            className="btn btn-block  btn-warning shadow-lg my-1 border-0"
                            style={{ backgroundColor: '#F7CE3E' }}
                          >
                            <i className="fas fa-lock" /> {data.restriction}
                          </button>
                          {data.bountyPaid ? (
                            <button className="btn btn-block  btn-danger shadow-lg mt-1 mb-0 border-0">
                              Bounty Claimed
                            </button>
                          ) : (
                            <button
                              className="btn btn-block  shadow-lg mt-1 mb-0 border-0"
                              style={{
                                backgroundColor: '#217CA3',
                              }}
                            >
                              Bounty Not Claimed
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-footer d-flex flex-row-reverse bg-transparent pb-0 border-0 "
                    style={{ cursor: 'auto' }}
                  >
                    {data.tags.map(tag => {
                      return (
                        <span
                          className="badge badge-gray"
                          key={tag}
                          style={{ cursor: 'pointer' }}
                          onClick={e => this.props.filter(e, tag, null)}
                        >
                          <i className="fas fa-tags" style={{ color: '#217CA3' }} /> <u>{tag}</u>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    } else {
      return <Redirect to={`/questionContent/${this.state.selected}`} />;
    }
  }
}

export default compose(
  graphql(getQuestion, {
    options: props => {
      return {
        variables: {
          id: props.questionId,
        },
      };
    },
  }),
  graphql(QuestionLike, { name: 'QuestionLike' }),
  graphql(QuestionDislike, { name: 'QuestionDislike' }),
  graphql(IncrementQuestionViews, { name: 'IncrementQuestionViews' }),
)(QuestionItem);
