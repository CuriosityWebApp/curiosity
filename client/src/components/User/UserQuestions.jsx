import React, { Component } from 'react';
import moment from 'moment';
import { Redirect } from 'react-router-dom';

class UserQuestions extends Component {
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
          <strong>Questions</strong>
          <div className="list-group">
            {this.props.questions.length > 0 ? (
              this.props.questions.map(question => {
                return (
                  <div
                    key={question.id}
                    className="list-group-item list-group-item-action flex-column align-items-start"
                    onClick={() => {
                      this.redirector(question.id);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5>{question.questionTitle}</h5>
                      <p>Reward: {question.bounty}</p>
                      <p>{question.bountyPaid}</p>
                    </div>
                    <div>
                      <small className="text-muted d-flex w-100 justify-content-between">
                        Created at: {moment(question.createdAt).fromNow()}
                      </small>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="card">
                <div className="card-body">
                  <div>No Questions</div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}
export default UserQuestions;
