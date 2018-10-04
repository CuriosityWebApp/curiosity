import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getUser } from '../../queries/queries.js';
import UserInfo from './UserInfo.jsx';
import UserWallet from './UserWallet.jsx';
import UserQuestions from './UserQuestions.jsx';
import UserAnswers from './UserAnswers.jsx';

class ProfileUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'info',
    };

    // this.displayUser = this.displayUser.bind(this);
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }
    if (this.props.data.error) {
      return <div>Error...</div>;
    } else {
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" style={{ color: 'white' }}>
              {this.props.data.user.username}
              's Profile
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className={this.state.activeTab === 'info' ? 'nav-item active' : 'nav-item'}>
                  <a
                    className="nav-link"
                    onClick={() => {
                      this.setState({ activeTab: 'info' });
                    }}
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    Info <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className={this.state.activeTab === 'wallet' ? 'nav-item active' : 'nav-item'}>
                  <a
                    className="nav-link"
                    onClick={() => {
                      this.setState({ activeTab: 'wallet' });
                    }}
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    Wallet
                  </a>
                </li>
                <li
                  className={this.state.activeTab === 'questions' ? 'nav-item active' : 'nav-item'}
                >
                  <a
                    className="nav-link"
                    onClick={() => {
                      this.setState({ activeTab: 'questions' });
                    }}
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    Questions
                  </a>
                </li>
                <li className={this.state.activeTab === 'answers' ? 'nav-item active' : 'nav-item'}>
                  <a
                    className="nav-link"
                    onClick={() => {
                      this.setState({ activeTab: 'answers' });
                    }}
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    Answers
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          {this.state.activeTab === 'info' && <UserInfo user={this.props.data.user} />}
          {this.state.activeTab === 'wallet' && <UserWallet user={this.props.data.user} />}
          {this.state.activeTab === 'questions' && (
            <UserQuestions questions={this.props.data.user.questions} />
          )}
          {this.state.activeTab === 'answers' && (
            <UserAnswers answers={this.props.data.user.answers} />
          )}
        </div>
      );
    }
  }
}

export default graphql(getUser, {
  options: props => {
    console.log('this are passed props', props);
    return {
      variables: {
        id: props.id,
      },
    };
  },
})(ProfileUser);
