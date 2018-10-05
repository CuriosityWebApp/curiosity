import React from 'react';
import { searchQuestion } from '../../queries/queries.js';
import { withApollo } from 'react-apollo';
import Autocomplete from 'react-autocomplete';
import { Redirect, Switch, Link } from 'react-router-dom';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      questions: [],
      searched: false,
      clicked: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.executeSearch = this.executeSearch.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
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
          this.setState({
            questions: data.searchQuestion,
          });
        } else {
          console.log('waiting for term to fetch user data');
        }
      });
  };

  handleInputChange(evt) {
    this.setState({ term: evt.target.value });
  }

  executeSearch(e) {
    e.preventDefault();
    this.setState({ searched: true }, () => {
      this.setState({ searched: false });
    });
  }

  render() {
    return (
      <div>
        <form className="form-inline" onSubmit={this.executeSearch}>
          <label className="sr-only" htmlFor="inlineFormInputName2">
            Name
          </label>
          <input
            className="form-control"
            placeholder="Filter Questions"
            value={this.state.term}
            onChange={this.handleInputChange}
          />
          <button type="submit" className="btn btn-primary mb-2" onClick={this.executeSearch}>
            Filter
          </button>
        </form>
        {this.state.searched && <Redirect to={`/search/${this.state.term}`} />}
      </div>
    );
  }
}

export default withApollo(Search);
