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
			clicked: false
		};
		this.executeSearch = this.executeSearch.bind(this);
	}

	executeSearch(e) {
		e.preventDefault();
		this.setState({ searched: true }, () => {
			this.setState({ searched: false, term: '' });
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
						onChange={e => {
							this.setState({ term: e.target.value });
						}}
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
