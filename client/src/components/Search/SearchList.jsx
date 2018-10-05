import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { searchQuestion } from '../../queries/queries.js';
import { Redirect } from 'react-router-dom';
import SearchItem from '../Search/SearchItem.jsx';

class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      redirectAnswer: false,
    };
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(id) {
    this.setState(
      {
        selected: id,
      },
      () => {
        this.setState({
          redirectAnswer: true,
        });
      },
    );
  }

  displayQuestions() {
    let data = this.props.data.searchQuestion;
    if (this.props.data.loading) {
      return <div>Loading Questions...</div>;
    } else if (data.length < 1) {
      return <div>No search results</div>;
    } else {
      return data.map(post => {
        return <SearchItem key={post.id} postData={post} onSelect={this.onSelect} />;
      });
    }
  }

  render() {
    if (!this.state.redirectAnswer) {
      return (
        <div>
          <div>{this.displayQuestions()}</div>
        </div>
      );
    } else {
      return <Redirect to={`/questionContent/${this.state.selected}`} />;
    }
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
