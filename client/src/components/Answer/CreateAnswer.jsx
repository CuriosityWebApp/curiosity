import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { AddAnswer } from '../../mutations/mutations.js';

class CreateAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerContent: '',
    };
    this.changeContent = this.changeContent.bind(this);
  }
  changeContent(e) {
    this.setState({ answerContent: e.target.value });
  }
  submitAnswer(e) {
    this.state.answerContent
      ? this.props
          .mutate({
            mutation: AddAnswer,
            variables: {
              userId: this.props.user.id,
              questionId: this.props.questionId,
              answer: this.state.answerContent,
            },
          })
          .then(() => {
            this.setState({ answerContent: '' });
            this.props.data.refetch();
          })
          .catch(err => console.log('having problems in submit answer ', err))
      : this.props.notify('error', 'Please write your answer before sending it');
  }
  render() {
    return (
      <div className="form-group">
        <label className="ml-1 pl-1">Answer:</label>
        <br />
        <textarea
          className="form-control"
          rows="10"
          cols="85"
          value={this.state.answerContent}
          onChange={this.changeContent}
          required="required"
          data-error="Answer content is required"
          placeholder="Please write your answer here..."
        />
        <br />
        <button
          className="fas fa-paper-plane btn btn-primary custom-btn shadow ml-2 pl-2"
          onClick={this.submitAnswer.bind(this)}
        >
          {' '}
          Send
        </button>
      </div>
    );
  }
}

export default graphql(AddAnswer)(CreateAnswer);
