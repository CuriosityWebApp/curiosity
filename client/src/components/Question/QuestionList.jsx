import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { getQuestions } from '../../queries/queries.js';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import QuestionItem from './QuestionItem.jsx';
import QuestionNavBar from './QuestionNavBar.jsx';

class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      skip: 0,
      questions: [],
      filterBy: '',
      sortBy: '',
      range: null,
    };
    this.onSelect = this.onSelect.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.getNextQuestions = this.getNextQuestions;
    this.throttledQuestionCall = _.throttle(
      this.getNextQuestions,
      this.state.sortBy === 'top' ? 700 : 500,
      {
        leading: false,
      },
    ).bind(this);
    this.filterQuestions = this.filterQuestions.bind(this);
    this.sortQuestions = this.sortQuestions.bind(this);
  }
  componentDidMount() {
    this.throttledQuestionCall();
    window.addEventListener('scroll', this.onScroll, false);
    console.log('this is the state', this.state);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 400 &&
      this.state.questions.length
    ) {
      window.removeEventListener('scroll', this.onScroll, false);
      this.throttledQuestionCall();
    }
  };

  sortQuestions = async (e, method, range) => {
    e ? e.preventDefault() : '';
    // console.log('this is the sorting method', method);
    console.log('im inside sort', e, method, range);
    await this.setState({ sortBy: method, skip: 0, questions: [], range: range }, () => {
      this.props.client
        .query({
          query: getQuestions,
          variables: {
            limit: 15,
            skip: this.state.skip,
            filter: this.state.filterBy,
            sortBy: this.state.sortBy,
            range: this.state.range,
          },
        })
        .then(({ data }) => {
          console.log('this is data sorted', data);
          let newQuestions = this.state.questions.concat(data.questions);
          this.setState({ questions: newQuestions, skip: this.state.skip + 15 });
          window.addEventListener('scroll', this.onScroll, false);
          console.log('this is the state in sort', this.state);
        });
    });
  };

  filterQuestions = async (e, category, range) => {
    e.preventDefault();
    console.log('im inside filter');

    // console.log('this is the category', category);
    await this.setState({ filterBy: category, skip: 0, questions: [], range: range }, () => {
      this.props.client
        .query({
          query: getQuestions,
          variables: {
            limit: 15,
            skip: this.state.skip,
            filter: this.state.filterBy,
            sortBy: this.state.sortBy,
            range: this.state.range,
          },
        })
        .then(({ data }) => {
          console.log('this is data filter', data);
          let newQuestions = this.state.questions.concat(data.questions);

          this.setState({ questions: newQuestions, skip: this.state.skip + 15 });
          window.addEventListener('scroll', this.onScroll, false);
        });
    });
  };

  getNextQuestions = async () => {
    await this.props.client
      .query({
        query: getQuestions,
        variables: {
          limit: 15,
          skip: this.state.skip,
          filter: this.state.filterBy,
          sortBy: this.state.sortBy,
          range: this.state.range,
        },
      })
      .then(({ data }) => {
        console.log('this is data', data);
        let newProps = this.state.questions.concat(data.questions);
        let next;
        data.questions.length
          ? (next = this.state.skip + 15)
          : (next = this.state.questions.length);
        this.setState({ questions: newProps, skip: next }, () => {
          console.log('im inside then next');
          console.log('this is the state in next', this.state);
        });
      })
      .then(() => window.addEventListener('scroll', this.onScroll, false))
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
    let filter = this.state.filterBy ? (
      <span className="badge badge-warning">{this.state.filterBy}</span>
    ) : (
      ''
    );
    let sorted = this.state.sortBy ? (
      this.state.sortBy !== 'createdAt' ? (
        <span className="badge badge-warning">{this.state.sortBy}</span>
      ) : (
        <span className="badge badge-warning">New first</span>
      )
    ) : (
      ''
    );
    let range = this.state.range ? (
      this.state.range > 1 ? (
        <span className="badge badge-warning">{this.state.range} days</span>
      ) : (
        <span className="badge badge-warning">Today</span>
      )
    ) : (
      <span className="badge badge-warning">All time</span>
    );
    if (!this.state.selected) {
      return (
        <div>
          <QuestionNavBar
            sortQuestions={this.sortQuestions}
            filterQuestions={this.filterQuestions}
          />
          <span className="badge badge-primary">Filtered by: </span> {filter} {sorted} {range}
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
          sortBy: '',
          range: null,
        },
      };
    },
  }),
)(QuestionList);
