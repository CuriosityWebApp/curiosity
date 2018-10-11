import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { getQuestions } from '../../queries/queries.js';
import { Redirect } from 'react-router-dom';
import QuestionItem from './QuestionItem.jsx';
import _ from 'lodash';

class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      skip: 0,
      questions: [],
      filterBy: '',
    };
    this.onSelect = this.onSelect.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.getNextQuestions = this.getNextQuestions.bind(this);
    this.throttledQuestionCall = _.throttle(this.getNextQuestions, 250, { leading: false });
    this.displayCategories = this.displayCategories.bind(this);
  }
  componentDidMount() {
    this.getNextQuestions();
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      this.state.questions.length
    ) {
      window.removeEventListener('scroll', this.onScroll, false);
      this.throttledQuestionCall();
    }
  };
  displayCategories() {
    let categories = ['Biology', 'Technology', 'History', 'Chemistry', 'Politics', 'Economy'];
    return categories.map(category => {
      return (
        <option key={category} value={category}>
          {category}
        </option>
      );
    });
  }

  filterQuestions() {
    this.props.client
      .query({
        query: getQuestions,
        variables: {
          limit: 15,
          skip: 0,
          filter: this.state.filterBy,
        },
      })
      .then(({ data }) => {
        console.log('this is data filter', data);
        this.setState({ questions: data.questions });
        window.addEventListener('scroll', this.onScroll, false);
      });
  }

  getNextQuestions = async () => {
    await this.props.client
      .query({
        query: getQuestions,
        variables: {
          limit: 15,
          skip: this.state.skip,
          filter: this.state.filterBy,
        },
      })
      .then(({ data }) => {
        let newProps = this.state.questions.concat(data.questions);
        let next = this.state.skip + 10;
        this.setState({ questions: newProps, skip: next }, () => {
          window.addEventListener('scroll', this.onScroll, false);
        });
      })
      .catch(err => console.log('error in nextquestions', err));
  };

  onSelect(id) {
    this.setState({
      selected: id,
    });
  }

  displayQuestions() {
    if (this.props.data.loading) {
      return <div>Loading Questions...</div>;
    } else {
      let data = this.state.questions.length > 0 ? this.state.questions : this.props.data.questions;
      return data.map(post => {
        return (
          <QuestionItem
            key={post.id}
            questionId={post.id}
            onSelect={this.onSelect}
            userId={this.props.userId}
          />
        );
      });
    }
  }

  render() {
    if (!this.state.selected) {
      return (
        <div>
          <h2>
            <u>Questions</u>
          </h2>
          {'    '}
          <label> Filter By: </label>{' '}
          <select onChange={e => this.setState({ filterBy: e.target.value })}>
            <option>Select Category</option>
            {this.displayCategories()}
          </select>
          <button
            type="submit"
            className="btn btn-primary mb-2"
            style={{ marginLeft: '10px' }}
            onClick={this.filterQuestions.bind(this)}
          >
            Submit
          </button>
          <div />
          {this.displayQuestions()}
          <div>
            <h3> You read all of it! Check back later...</h3>
          </div>
        </div>
      );
    } else {
      return <Redirect to={`/questionContent/${this.state.selected}`} />;
    }
  }
}

export default compose(
  withApollo,
  graphql(getQuestions, {
    options: () => {
      return {
        variables: {
          limit: 15,
          skip: 0,
          filter: '',
        },
      };
    },
  }),
)(QuestionList);
