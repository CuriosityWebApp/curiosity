import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAnswer } from '../../queries/queries.js';
import { UpdateAnswerLikes } from '../../mutations/mutations.js';
import moment from 'moment';

class AnswerItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: null,
    };
    this.UpdateLikes = this.UpdateLikes.bind(this);
  }

  UpdateLikes(e) {
    if (e.target.value > 0 && (this.state.clicked === null || this.state.clicked === 'down')) {
      console.log('getting here, these are the values', e.target.value);
      this.props
        .UpdateAnswerLikes({
          variables: {
            userId: this.props.getAnswer.answer.user.id,
            answerId: this.props.answerId,
            score: 1,
          },
        })
        .then(() => this.setState({ clicked: 'up' }));
    } else if (e.target.value < 0 && (this.state.clicked === null || this.state.clicked === 'up')) {
      this.props
        .UpdateAnswerLikes({
          variables: {
            userId: this.props.getAnswer.answer.user.id,
            answerId: this.props.answerId,
            score: -1,
          },
        })
        .then(() => this.setState({ clicked: 'down' }));
    } else {
      alert('You cannot add multiple likes/dislikes to 1 answer!');
    }
  }
  chooseAnswer() {
    if (
      this.props.ownerId === this.props.loggedId &&
      this.props.getAnswer.answer.user.id !== this.props.loggedId &&
      !this.props.isPaid
    ) {
      return (
        <small>
          <button type="button"> Choose This Answer </button>
        </small>
      );
    }
  }
  displayAnswer() {
    console.log('THIS ARE THE PROPS answer', this.props.getAnswer);
    console.log('THIS ARE THE UPDATE', this.props.UpdateAnswerLikes);
    let data = this.props.getAnswer;
    if (data && data.loading) {
      return <div>Loading answers...</div>;
    } else {
      console.log('this is data for answers', data);
      return (
        <div className="list-group">
          <div className="list-group-item list-group-item-action flex-column align-items-start">
            <div class="row">
              <div class="col-1">
                <div class="row" style={{ textAlign: 'right' }}>
                  <div class="col align-self-start">
                    <i class="fa fa-caret-up" aria-hidden="true" style={{ color: 'green' }} />
                  </div>
                  <div class="col align-self-start">{postData.score}</div>
                  <div class="col align-self-start">
                    <i class="fa fa-caret-down" aria-hidden="true" style={{ color: 'red' }} />
                  </div>
                </div>
              </div>
              <div class="col-11">
                <div className="d-flex w-100 justify-content-between">
                  <div>
                    <small>
                      Answer By {data.answer.user.username}{' '}
                      {moment(data.answer.createdAt).fromNow()}
                    </small>
                    <br />
                    {this.chooseAnswer()}
                  </div>
                  <div>
                    <small>Rank: {data.answer.user.rank}</small> <br />
                    <small>Votes: {data.answer.score}</small>
                  </div>
                </div>
                <br />
                <div className="answerContent">
                  <p>{data.answer.answer}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
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
  graphql(UpdateAnswerLikes, { name: 'UpdateAnswerLikes' }),
)(AnswerItem);
