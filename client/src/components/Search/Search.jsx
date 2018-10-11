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
    this.executeSearch = this.executeSearch.bind(this);
    this.searchQuestions = this.searchQuestions.bind(this);
  }

  searchQuestions(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.props.client
        .query({
          query: searchQuestion,
          variables: {
            term: this.state.term,
          },
        })
        .then(({ data }) => {
          if (data.searchQuestion) {
            this.setState({ questions: data.searchQuestion });
          }
        });
    });
  }

  executeSearch(e) {
    e.preventDefault();
    if (this.state.term === '') {
      this.setState({ term: ' ' }, () => {
        this.setState({ searched: true }, () => {
          this.setState({ searched: false, term: '' });
        });
      });
    } else {
      this.setState({ searched: true }, () => {
        this.setState({ searched: false, term: '' });
      });
    }
  }

  render() {
    return (
      <div>
        <form className="form-inline" onSubmit={this.executeSearch}>
          <label className="sr-only" htmlFor="inlineFormInputName2">
            Name
          </label>

          <Autocomplete
            items={this.state.questions}
            getItemValue={item => item.questionTitle}
            renderItem={(item, highlighted) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: highlighted ? '#eee' : 'transparent',
                }}
              >
                {item.questionTitle}
              </div>
            )}
            wrapperStyle={{
              marginBottom: '7px',
              position: 'sticky',
            }}
            onChange={this.searchQuestions}
            onSelect={value => this.setState({ term: value })}
            value={this.state.term}
            inputProps={{
              placeholder: 'Filter Questions',
              name: 'term',
              style: { width: '500px' },
              className: 'form-control',
            }}
          />
          <button
            type="submit"
            className="btn btn-primary mb-2"
            onClick={this.executeSearch}
            style={{ marginLeft: '10px' }}
          >
            Filter
          </button>
        </form>
        {this.state.searched && <Redirect to={`/search/${this.state.term}`} />}
      </div>
    );
  }
}

export default withApollo(Search);
