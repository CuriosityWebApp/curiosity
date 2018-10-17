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
      return <div>Error</div>;
    } else {
      let { username } = this.props;
      return (
        <div>
          <Link
            to={`/questionContent/${answer.question.id}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <div className="card" key={answer.id}>
              <small>
                <i className="fas fa-comment" /> <b className="marigold">{username}</b> answered on{' '}
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
                {username} {answer.score} likes - <em>{moment(answer.createdAt).fromNow()}</em>
                <div>
                  <em>
                    {answer.answerChosen ? (
                      <span className="badge successBtn marigold">Chosen as Best Answer</span>
                    ) : (
                      ''
                    )}
                  </em>
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
