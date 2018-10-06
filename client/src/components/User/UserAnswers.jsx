import React, { Component } from 'react';
import moment from 'moment';
import { Redirect } from 'react-router-dom';

class UserAnswers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirected: false,
      questionId: '',
    };
    this.redirector = this.redirector.bind(this);
  }

  redirector(id) {
    this.setState({ questionId: id }, () => {
      this.setState({
        redirected: true,
      });
    });
  }

  render() {
    if (this.state.redirected) {
      return <Redirect to={`/questionContent/${this.state.questionId}`} />;
    } else {
      return (
        <div className="card">
          <strong>Answers</strong>
          <div className="list-group">
            {this.props.answers.length > 0 ? (
              this.props.answers.map(answer => {
                return (
                  <div
                    key={answer.id}
                    className="list-group-item list-group-item-action flex-column align-items-start"
                    onClick={() => {
                      this.redirector(answer.question.id);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h3> {answer.question.questionTitle}</h3>
                      <h5>Answer: {answer.answer}</h5>
                      <p>Score: {answer.score}</p>
                    </div>
                    <div>
                      <small className="text-muted d-flex w-100 justify-content-between">
                        CreatedAt: {moment(answer.createdAt).fromNow()}
                      </small>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="card">
                <div className="card-body">
                  <div>No Answers</div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}

export default UserAnswers;
