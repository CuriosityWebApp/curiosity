import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getQuestion } from '../../queries/queries.js';
import { Link } from 'react-router-dom';
import AnswerList from '../Answer/AnswerList.jsx';
import moment from 'moment';
import ProfileSmallPage from '../PublicProfile/ProfileSmallPage.jsx';

class QuestionContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerClicked: false,
      rerender: false,
    };
  }
  forceRender() {
    this.setState({ rerender: !this.state.rerender });
  }
  displayQuestionContent() {
    let data = this.props.data;
    if (data && data.loading) {
      return <div> Loading...</div>;
    }
    if (data.error) {
      return <div>Error...</div>;
    } else {
      return (
        <div className="list-group">
          <div className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="row">
              <div className="col-2">
                <Link
                  to={`/user/${data.question.user.id}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <ProfileSmallPage userId={data.question.user.id} />
                </Link>
              </div>
              <div className="col-2">
                <small style={{ textAlign: 'center' }}>
                  Posted By {data.question.user.username} <br />
                  {moment(data.question.createdAt).fromNow()} <br />
                  Bounty: {data.question.bounty} <br />
                  Category: {data.question.category ? data.question.category : 'None'}
                </small>
              </div>
              <div className="col-7">
                <h3 className="mb-1">{data.question.questionTitle}</h3> <br />
                <div>{data.question.questionContent}</div>
              </div>
            </div>
          </div>
          <AnswerList
            id={this.props.id}
            ownerId={data.question.user.id}
            loggedId={this.props.loggedId}
            isPaid={data.question.bountyPaid}
            bounty={data.question.bounty}
            userId={this.props.user.id}
            questionId={this.props.id}
            signedIn={this.props.user.signedIn}
          />
        </div>
      );
    }
  }
  render() {
    return this.displayQuestionContent();
  }
}

export default graphql(getQuestion, {
  options: props => {
    return {
      variables: {
        id: props.id,
      },
    };
  },
})(QuestionContent);
