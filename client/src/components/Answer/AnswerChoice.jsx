import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAnswer, getQuestion } from '../../queries/queries.js';
import {
  UpdatePaid,
  UpdateCredit,
  AddTransaction,
  UpdateChosenAnswer,
} from '../../mutations/mutations.js';

class AnswerChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: null,
    };
    this.chooseAnswer = this.chooseAnswer.bind(this);
    this.clickChooseAnswer = this.clickChooseAnswer.bind(this);
  }

  clickChooseAnswer() {
    this.props
      .UpdatePaid({
        variables: {
          id: this.props.questionId,
          bountyPaid: true,
        },
      })
      .then(() => {
        this.props.UpdateCredit({
          mutation: UpdateCredit,
          variables: {
            id: this.props.getAnswer.answer.user.id,
            credit: this.props.getQuestion.question.bounty,
          },
        });
      })
      .then(() => {
        this.props.AddTransaction({
          mutation: AddTransaction,
          variables: {
            transactionMeans: `Chosen as Best Answer (${
              this.props.getQuestion.question.questionTitle
            })`,
            questionId: this.props.getQuestion.question.id,
            senderId: this.props.qOwnerId,
            receiverId: this.props.getAnswer.answer.user.id,
            amount: this.props.getQuestion.question.bounty,
          },
        });
      })
      .then(() => {
        this.props.UpdateChosenAnswer({
          mutation: UpdateChosenAnswer,
          variables: {
            id: this.props.answerId,
            answerChosen: true,
          },
        });
      })
      .then(() => {
        this.props.refetch();
      })
      .catch(err => console.error(err));
  }

  chooseAnswer() {
    if (
      this.props.qOwnerId === this.props.loggedId &&
      this.props.getAnswer.answer.user.id !== this.props.loggedId &&
      !this.props.getQuestion.question.bountyPaid
    ) {
      return (
        <small>
          <button type="button" onClick={this.clickChooseAnswer}>
            Choose This Answer
          </button>
        </small>
      );
    }

    if (this.props.getQuestion.question.bountyPaid && this.props.getAnswer.answer.answerChosen) {
      return <small>Best Answer</small>;
    }
  }

  render() {
    let data = this.props.getAnswer;
    if (data && data.loading) {
      return <div>Loading answers...</div>;
    } else {
      return <div>{this.chooseAnswer()}</div>;
    }
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
  graphql(getQuestion, {
    name: 'getQuestion',
    options: props => {
      return {
        variables: {
          id: props.questionId,
        },
      };
    },
  }),
  graphql(UpdatePaid, { name: 'UpdatePaid' }),
  graphql(UpdateCredit, { name: 'UpdateCredit' }),
  graphql(AddTransaction, { name: 'AddTransaction' }),
  graphql(UpdateChosenAnswer, { name: 'UpdateChosenAnswer' }),
)(AnswerChoice);
