import React from 'react';
import { searchQuestion } from '../../queries/queries.js';
import { withApollo } from 'react-apollo';
import Autocomplete from 'react-autocomplete';
import { Redirect, Link } from 'react-router-dom';

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
        })
        .catch(err => console.error(err));
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
        <form onSubmit={this.executeSearch} className="form-inline">
          <label className="sr-only" htmlFor="inlineFormInputName2">
            Name
          </label>

          <Autocomplete
            items={this.state.questions}
            getItemValue={item => item.questionTitle}
            menuStyle={{
              borderRadius: '3px',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
              background: 'rgba(255, 255, 255, 1)',
              padding: '2px 0',
              fontSize: '90%',
              position: 'absolute',
              overflow: 'auto',
              maxHeight: '50%',
              zIndex: 1,
            }}
            renderItem={(item, highlighted) => {
              var searchLink = `/questionContent/${item.id}`;
              return (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: highlighted ? '#eee' : 'transparent',
                  }}
                >
                  <Link to={searchLink} style={{ color: 'black', textDecoration: 'none' }}>
                    <div>{item.questionTitle}</div>
                  </Link>
                </div>
              );
            }}
            onChange={this.searchQuestions}
            onSelect={value => this.setState({ term: '' })}
            value={this.state.term}
            inputProps={{
              placeholder: 'Filter Questions',
              name: 'term',
              style: { width: '400px' },
              className: 'form-control-sm',
            }}
            wrapperStyle={{
              position: 'relative',
            }}
            menuStyle={{
              top: 35,
              left: 0,
              position: 'absolute',
              borderRadius: '0px',
              border: '1px solid',
              zIndex: '5000',
              backgroundColor: 'white',
            }}
          />

          <a className="icon-circle border-0 bg-transparent ml-2" onClick={this.executeSearch}>
            <i
              className="fas fa-search  border-0 bg-transparent"
              style={{ fontSize: '20px', color: '#F7CE3E', cursor: 'pointer' }}
            />
          </a>
        </form>
        {this.state.searched && <Redirect to={`/search/${this.state.term}`} />}
      </div>
    );
  }
}

export default withApollo(Search);
