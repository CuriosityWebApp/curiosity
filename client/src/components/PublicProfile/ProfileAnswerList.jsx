import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { getAnswer } from '../../queries/queries.js';
import moment from 'moment';

class ProfileAnswerList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { loading, error, answer } = this.props.data;
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      console.log(error);
      return <div>Error</div>;
    } else {
      return (
        <div>
          <Link
            to={`/questionContent/${answer.question.id}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <div className="card" key={answer.id}>
              <small>
                <i className="fas fa-comment" />{' '}
                <b style={{ color: '#14C7F4' }}>{this.props.username}</b> answered on{' '}
                <b>{answer.question.questionTitle}</b>
                <span>
                  {' '}
                  - <em>Posted By {answer.question.user.username}</em>
                </span>
              </small>
              <hr
                style={{
                  padding: '0px',
                  margin: '0px',
                }}
              />
              <small
                style={{
                  padding: '2px',
                  margin: '3px',
                }}
              >
                {this.props.username} {answer.score} likes -{' '}
                <em>{moment(answer.createdAt).fromNow()}</em>
                <div>
                  <em>{answer.answerChosen ? 'Chosen as Best Answer' : ''}</em>
                </div>
              </small>
              <small
                style={{
                  padding: '2px',
                  margin: '3px',
                }}
              >
                {answer.answer}
              </small>
              <br />
            </div>
            <br />
          </Link>
        </div>
      );
    }
  }
}

export default graphql(getAnswer, {
  options: props => {
    return {
      variables: {
        id: props.answer.id,
      },
    };
  },
})(ProfileAnswerList);
