import React, { Component } from 'react';

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

  handleFilterChange(e) {
    e.preventDefault();

    this.setState({ filterBy: e.target.value });
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
    let categories = ['Biology', 'Technology', 'History', 'Chemistry', 'Politics', 'Economy'];
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-collapse collapse show" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarTop"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Top
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarTop">
                <a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'top', null)}>
                  All time
                </a>
                <a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'top', '1')}>
                  Today
                </a>
                <a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'top', '7')}>
                  1 Week
                </a>
                <a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'top', '30')}>
                  1 Month
                </a>
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
              >
                Hot
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarHot">
                <a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'views', null)}>
                  All time
                </a>
                <a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'views', '1')}>
                  Today
                </a>
                <a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'views', '7')}>
                  1 Week
                </a>
                <a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'views', '30')}>
                  1 Month
                </a>
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
              >
                New
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarNew">
                <a
                  className="dropdown-item"
                  onClick={e => this.handleSortTopics(e, 'createdAt', null)}
                >
                  All time
                </a>
                <a
                  className="dropdown-item"
                  onClick={e => this.handleSortTopics(e, 'createdAt', '1')}
                >
                  Today
                </a>
                <a
                  className="dropdown-item"
                  onClick={e => this.handleSortTopics(e, 'createdAt', '7')}
                >
                  1 Week
                </a>
                <a
                  className="dropdown-item"
                  onClick={e => this.handleSortTopics(e, 'createdAt', '30')}
                >
                  1 Month
                </a>
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
              >
                Top Bounty
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarBounty">
                <a
                  className="dropdown-item"
                  onClick={e => this.handleSortTopics(e, 'bounty', null)}
                >
                  All time
                </a>
                <a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'bounty', '1')}>
                  Today
                </a>
                <a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'bounty', '7')}>
                  1 Week
                </a>
                <a
                  className="dropdown-item"
                  onClick={e => this.handleSortTopics(e, 'bounty', '30')}
                >
                  1 Month
                </a>
              </div>
            </li>{' '}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarRecommendation"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Recommendations
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarRecommendation">
                <a
                  className="dropdown-item"
                  onClick={e => this.handleSortTopics(e, 'recommendation', null)}
                >
                  All time
                </a>
                <a
                  className="dropdown-item"
                  onClick={e => this.handleSortTopics(e, 'recommendation', '1')}
                >
                  Today
                </a>
                <a
                  className="dropdown-item"
                  onClick={e => this.handleSortTopics(e, 'recommendation', '7')}
                >
                  1 Week
                </a>
                <a
                  className="dropdown-item"
                  onClick={e => this.handleSortTopics(e, 'recommendation', '30')}
                >
                  1 Month
                </a>
              </div>
            </li>{' '}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarCategories"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Category
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarCategories">
                {categories.map((category, idx) => {
                  return (
                    <option
                      value={category}
                      className="dropdown-item"
                      key={idx}
                      onClick={e => this.handleFilterTopics(e)}
                    >
                      {category}
                    </option>
                  );
                })}
              </div>
            </li>{' '}
          </ul>
        </div>
      </nav>
    );
  }
}

export default QuestionNavBar;
