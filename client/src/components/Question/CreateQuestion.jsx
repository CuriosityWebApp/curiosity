import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { AddQuestion } from '../../mutations/mutations.js';

class CreateQuestion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: '',
			title: '',
			content: '',
			bounty: '',
			category: ['Biology', 'Technology', 'History', 'Chemistry', 'Politics', 'Economy'],
			restriction: '',
			tags: []
		};
	}

	render() {
		const { title, content, bounty, category, restriction, tags } = this.state;
		return (
			<div>
				<h2>Ask a Question: </h2>
				<form>
					<label>Amount of Bounty: </label>
					<input type="number" value={bounty} onchange={e => this.setState({ bounty: e.target.value })} />
					<label>Category: </label>
					<select>
						<options />
					</select>
				</form>
			</div>
		);
	}
}

export default CreateQuestion;
