import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { searchQuestion } from '../../queries/queries.js';
import { Redirect } from 'react-router-dom';
import SearchItem from '../Search/SearchItem.jsx';

class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onSelect: null,
    };
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(id) {
    this.setState({
      onSelect: id,
    });
  }

  displayQuestions() {
    let { searchQuestion, loading, error } = this.props.data;
    if (loading) {
      return <div>Loading Questions...</div>;
    } else if (error) {
      return <div>Error</div>;
    } else if (searchQuestion && !this.state.onSelect) {
      if (searchQuestion.length < 1) {
        return <div>No search results</div>;
      } else {
        return searchQuestion.map(post => {
          return <SearchItem key={post.id} postData={post} onSelect={this.onSelect} />;
        });
      }
    }

    if (this.state.onSelect) {
      return <Redirect to={`/questionContent/${this.state.onSelect}`} />;
    }
  }

  render() {
    return <div>{this.displayQuestions()}</div>;
  }
}

export default graphql(searchQuestion, {
  options: props => {
    return {
      variables: {
        term: props.term,
      },
    };
  },
})(SearchList);
