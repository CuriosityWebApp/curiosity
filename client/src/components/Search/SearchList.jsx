import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { searchQuestion } from '../../queries/queries.js';
import { Redirect } from 'react-router-dom';
import SearchItem from '../Search/SearchItem.jsx';

class SearchList extends Component {
  constructor(props) {
    super(props);
  }

  displayQuestions() {
    let data = this.props.data.searchQuestion;
    if (this.props.data.loading) {
      return <div>Loading Questions...</div>;
    } else if (data) {
      if (data.length < 1) {
        return <div>No search results</div>;
      } else {
        return data.map(post => {
          return <SearchItem key={post.id} postData={post} />;
        });
      }
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
