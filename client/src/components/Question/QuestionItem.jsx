import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    this.state = {};
    this.IncrementLikes = this.IncrementLikes.bind(this);
    this.decrementLikes = this.decrementLikes.bind(this);
    this.throttledIcrement = _.throttle(this.IncrementLikes, 200, { leading: false }).bind(this);
    this.throttledDecrement = _.throttle(this.decrementLikes, 200, { leading: false }).bind(this);
    this.OpenQuestion = this.OpenQuestion.bind(this);
  }

  IncrementLikes(e) {
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

  decrementLikes(e) {
    let up, down, data;
    let userId = this.props.userId;

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
  OpenQuestion() {
    let id = this.props.data.question.id;
    this.props.onSelect(id);

    this.props
      .IncrementQuestionViews({
        mutation: IncrementQuestionViews,
        variables: {
          id: id,
        },
      })
      .then(() => this.props.data.refetch());
  }

  render() {
    if (this.props.data && this.props.data.loading) {
      return <div> Loading...</div>;
    } else {
      let data = this.props.data.question;
      let hoverText = `Likes: ${this.props.data.question.ratedUpBy.length}, Dislikes: ${
        this.props.data.question.ratedDownBy.length
      }`;
      return (
        <div className="inline-block container" style={{ cursor: 'pointer' }}>
          <div className="list-group">
            <div className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="row">
                <div className="col-1">
                  <div className="row" style={{ textAlign: 'right' }}>
                    <div className="col align-self-start">
                      <div>
                        <button
                          className="fas fa-angle-up fa-2x"
                          aria-hidden="true"
                          style={{
                            color: 'green',
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
                    </div>
                    <div className="col align-self-start" style={{ textAlign: 'center' }}>
                      <ReactTooltip effect="solid" />
                      <p data-tip={hoverText}>{data.score}</p>
                    </div>
                    <div className="col align-self-start">
                      <div>
                        <button
                          className="fas fa-angle-down fa-2x"
                          aria-hidden="true"
                          style={{
                            color: 'red',
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
                  </div>
                </div>
                <div className="col-11" onClick={this.OpenQuestion}>
                  <div className="d-flex w-100 justify-content-between">
                    <h5>{data.questionTitle}</h5>
                    <h6>
                      Reward: {data.bounty} <br /> Views: {data.views}
                    </h6>
                  </div>
                  <div>
                    <small className="text-muted d-flex w-100 justify-content-between">
                      Posted By {data.user.username} {moment(data.createdAt).fromNow()}
                    </small>
                    <small className="text-muted"> Rank {data.restriction} </small>
                    <small className="text-muted"> Answers {data.answers.length}</small>
                    <p>{data.questionContent}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
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
