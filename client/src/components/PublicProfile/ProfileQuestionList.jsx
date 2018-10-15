import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { getQuestion } from '../../queries/queries.js';
import moment from 'moment';

class ProfileQuestionList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { loading, error, question } = this.props.data;
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error...</div>;
    } else {
      let { id, questionTitle } = this.props.question;
      let { username } = this.props;
      return (
        <div>
          <Link to={`/questionContent/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <div className="card" key={id}>
              <small>
                <i className="fas fa-comment" /> <b style={{ color: '#14C7F4' }}>{username}</b>{' '}
                asked <b>{questionTitle}</b>
                <span>
                  {' '}
                  <em>
                    {' '}
                    - bounty: {question.bounty}{' '}
                    {question.bountyPaid ? <em>claimed</em> : <em>not claimed</em>}
                  </em>
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
                Posted {moment(question.createdAt).fromNow()}
                <div>Category: {question.category}</div>
                <div>
                  Tags:{' '}
                  {question.tags.map((tag, idx) => {
                    return <span key={idx}>{tag} </span>;
                  })}
                </div>
              </small>
              <small
                style={{
                  padding: '2px',
                  margin: '3px',
                }}
              >
                Number of Answers: {question.answers.length}
              </small>
            </div>
            <br />
          </Link>
        </div>
      );
    }
  }
}

export default graphql(getQuestion, {
  options: props => {
    return {
      variables: {
        id: props.question.id,
      },
    };
  },
})(ProfileQuestionList);
