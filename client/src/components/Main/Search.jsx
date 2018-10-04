import React from 'react';
import { graphql } from 'react-apollo';
import { searchQuestion } from '../../queries/queries.js';
import { client, withApollo } from 'react-apollo';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.executeSearch = this.executeSearch.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
  }

  executeSearch(e) {
    e.preventDefault();
  }

  getQuestions = async term => {
    const questionList = await this.props.client
      .query({
        query: searchQuestion,
        variables: {
          term: term,
        },
      })
      .then(({ data }) => {
        if (data.searchQuestion) {
          console.log(data.searchQuestion);
        } else {
          console.log('waiting for term to fetch user data');
        }
      });
  };

  handleInputChange(evt) {
    this.setState({ term: evt.target.value }, () => {
      this.getQuestions(this.state.term);
    });
  }

  render() {
    return (
      <form className="form-inline">
        <label className="sr-only" htmlFor="inlineFormInputName2">
          Name
        </label>
        <input
          className="form-control"
          type="text"
          value={this.state.term}
          onChange={this.handleInputChange}
          placeholder="Search Questions"
        />
        <button type="submit" className="btn btn-primary mb-2" onClick={this.executeSearch}>
          Submit
        </button>
      </form>
    );
  }
}

export default withApollo(Search);
