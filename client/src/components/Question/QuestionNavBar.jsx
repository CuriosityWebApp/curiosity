import React, { Component } from 'react';
import Search from '../Search/Search.jsx';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

class QuestionNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterBy: '',
      range: null,
      topic: '',
    };
    this.handleFilterTopics = this.handleFilterTopics.bind(this);
    this.handleSortTopics = this.handleSortTopics.bind(this);
  }

  handleSortTopics(e, value, range) {
    let topic = value || this.state.topic;
    let days = range || this.state.range;
    this.props.sortQuestions(e, topic, days);
  }

  handleFilterTopics(e) {
    this.props.filterQuestions(e, e.target.value, this.state.range);
  }
  render() {
    let categories = [
      'Biology',
      'Technology',
      'History',
      'Chemistry',
      'Politics',
      'Economy',
      'Psychology',
      'Random',
    ];
    if (this.props.user) {
      let { messages, questions } = this.props.user;
      var unreadMessages = 0;
      for (let i = 0; i < messages.length; i++) {
        if (messages[i].unread === true) {
          unreadMessages++;
        }
      }
      var unreadNotifications = 0;
      for (let j = 0; j < questions.length; j++) {
        for (let k = 0; k < questions[j].answers.length; k++) {
          if (questions[j].answers[k].questionerSeen === false) {
            unreadNotifications++;
          }
        }
      }
    }

    return (
      <div className="container-fluid mx-0 px-0">
        <nav
          className="navbar navbar-expand-lg navbar-dark mr-0 pr-0 mt-0"
          style={{ backgroundColor: '#2F3131' }}
        >
          <a className="navbar-brand mr-3 logoShadow uno" href="/">
            Curiosity
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="navbar-collapse collapse ml-2" id="navbarSupportedContent">
            <ul className="navbar-nav  mr-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarTop"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{ cursor: 'pointer' }}
                >
                  Top
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarTop">
                  <Link to="/">
                    <option
                      className="dropdown-item"
                      onClick={e => this.handleSortTopics(e, 'top', null)}
                    >
                      All time
                    </option>
                  </Link>
                  <Link to="/">
                    <option
                      className="dropdown-item"
                      onClick={e => this.handleSortTopics(e, 'top', '1')}
                    >
                      Today
                    </option>
                  </Link>
                  <Link to="/">
                    <option
                      className="dropdown-item"
                      onClick={e => this.handleSortTopics(e, 'top', '7')}
                    >
                      1 Week
                    </option>
                  </Link>
                  <Link to="/">
                    <option
                      className="dropdown-item"
                      onClick={e => this.handleSortTopics(e, 'top', '30')}
                    >
                      1 Month
                    </option>
                  </Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarHot"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{ cursor: 'pointer' }}
                >
                  Hot
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarHot">
                  <Link to="/">
                    <option
                      className="dropdown-item"
                      onClick={e => this.handleSortTopics(e, 'views', null)}
                    >
                      All time
                    </option>
                  </Link>
                  <Link to="/">
                    <option
                      className="dropdown-item"
                      onClick={e => this.handleSortTopics(e, 'views', '1')}
                    >
                      Today
                    </option>
                  </Link>
                  <Link to="/">
                    <option
                      className="dropdown-item"
                      onClick={e => this.handleSortTopics(e, 'views', '7')}
                    >
                      1 Week
                    </option>
                  </Link>
                  <Link to="/">
                    <option
                      className="dropdown-item"
                      onClick={e => this.handleSortTopics(e, 'views', '30')}
                    >
                      1 Month
                    </option>
                  </Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarNew"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{ cursor: 'pointer' }}
                >
                  New
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarNew">
                  <Link to="/">
                    <option
                      className="dropdown-item"
                      onClick={e => this.handleSortTopics(e, 'createdAt', null)}
                    >
                      All time
                    </option>
                  </Link>
                  <Link to="/">
                    <option
                      className="dropdown-item"
                      onClick={e => this.handleSortTopics(e, 'createdAt', '1')}
                    >
                      Today
                    </option>
                  </Link>
                  <Link to="/">
                    <option
                      className="dropdown-item"
                      onClick={e => this.handleSortTopics(e, 'createdAt', '7')}
                    >
                      1 Week
                    </option>
                  </Link>
                  <Link to="/">
                    <option
                      className="dropdown-item"
                      onClick={e => this.handleSortTopics(e, 'createdAt', '30')}
                    >
                      1 Month
                    </option>
                  </Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarBounty"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{ cursor: 'pointer' }}
                >
                  Top Bounty
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarBounty">
                  <Link to="/">
                    <option
                      className="dropdown-item"
                      onClick={e => this.handleSortTopics(e, 'bounty', null)}
                    >
                      All time
                    </option>
                  </Link>
                  <Link to="/">
                    <option
                      className="dropdown-item"
                      onClick={e => this.handleSortTopics(e, 'bounty', '1')}
                    >
                      Today
                    </option>
                  </Link>
                  <Link to="/">
                    <option
                      className="dropdown-item"
                      onClick={e => this.handleSortTopics(e, 'bounty', '7')}
                    >
                      1 Week
                    </option>
                  </Link>
                  <Link to="/">
                    <option
                      className="dropdown-item"
                      onClick={e => this.handleSortTopics(e, 'bounty', '30')}
                    >
                      1 Month
                    </option>
                  </Link>
                </div>
              </li>{' '}
              {this.props.signedIn && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarRecommendation"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ cursor: 'pointer' }}
                  >
                    Recommendations
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarRecommendation">
                    <Link to="/">
                      <option
                        className="dropdown-item"
                        onClick={e => this.handleSortTopics(e, 'recommendation', null)}
                      >
                        All time
                      </option>
                    </Link>
                    <Link to="/">
                      <option
                        className="dropdown-item"
                        onClick={e => this.handleSortTopics(e, 'recommendation', '1')}
                      >
                        Today
                      </option>
                    </Link>
                    <Link to="/">
                      <option
                        className="dropdown-item"
                        onClick={e => this.handleSortTopics(e, 'recommendation', '7')}
                      >
                        1 Week
                      </option>
                    </Link>
                    <Link to="/">
                      <option
                        className="dropdown-item"
                        onClick={e => this.handleSortTopics(e, 'recommendation', '30')}
                      >
                        1 Month
                      </option>
                    </Link>
                  </div>
                </li>
              )}
              <li className="nav-item dropdown mr-5">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarCategories"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{ cursor: 'pointer' }}
                >
                  Category
                </a>
                <div className="dropdown-menu " aria-labelledby="navbarCategories">
                  {categories.map((category, idx) => {
                    return (
                      <Link to="/" key={idx}>
                        <option
                          value={category}
                          className="dropdown-item"
                          onClick={e => this.handleFilterTopics(e)}
                        >
                          {category}
                        </option>
                      </Link>
                    );
                  })}
                </div>
              </li>{' '}
            </ul>
            <span>
              <Search />
            </span>
            <span>
              {this.props.signedIn && (
                <div>
                  <Link
                    to="/messages/unread"
                    className="icon-circle border-0 bg-transparent"
                    style={{ float: 'right' }}
                  >
                    <i
                      className="fas fa-envelope   border-0 bg-transparent"
                      style={{ fontSize: '20px', color: '#F7CE3E' }}
                    />
                    {unreadMessages > 0 && (
                      <span className="badge badge-danger">{unreadMessages}</span>
                    )}
                  </Link>
                  <Link
                    to="/notifications"
                    className="icon-circle border-0 bg-transparent"
                    style={{ float: 'right' }}
                  >
                    <i
                      className="fas fa-bell  border-0 bg-transparent"
                      style={{ fontSize: '20px', color: '#F7CE3E' }}
                    />
                    {unreadNotifications > 0 && (
                      <span className="badge badge-success">{unreadNotifications}</span>
                    )}
                  </Link>
                </div>
              )}
            </span>
          </div>
        </nav>
      </div>
    );
  }
}

export default QuestionNavBar;
