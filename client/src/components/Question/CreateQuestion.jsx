import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { AddQuestion } from '../../mutations/mutations.js';

class CreateQuestion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: this.props.userId,
			title: '',
			content: '',
			bounty: '',
			category: '',
			restriction: '',
			tags: ''
		};
	}

	displayCategories() {
		let categories = ['Biology', 'Technology', 'History', 'Chemistry', 'Politics', 'Economy'];

		return categories.map(category => {
			return (
				<option key={category} value={category}>
					{category}
				</option>
			);
		});
	}

	submitForm(e) {
		console.log('State of the CreateQuestion: ', this.state);
		let tags = this.state.tags.split('');
		console.log('TAGS IN FORM', tags);
		e.preventDefault();
		this.props.AddQuestion({
			variables: {
				userId: this.state.userId,
				title: this.state.title,
				content: this.state.content,
				bounty: this.state.bounty,
				category: this.state.category,
				restriction: this.state.restriction,
				tags: tags
			}
		});
	}
	render() {
		const { title, content, bounty, category, restriction, tags } = this.state;
		return (
			<div>
				<h2>Ask a Question: </h2>
				<form onSubmit={this.submitForm.bind(this)}>
					<label>Amount of Bounty: </label>
					<input type="number" value={bounty} onChange={e => this.setState({ bounty: e.target.value })} />
					<br />
					<label>Category: </label>
					<select>
						<option>Select Category</option>
						{this.displayCategories()}
					</select>
					<br />
					<label>Answer by rank: </label>
					<input
						type="number"
						value={restriction}
						onChange={e => this.setState({ restriction: e.target.value })}
					/>
					<br />
					<label>Tags (separated by space): </label>
					<input type="text" value={tags} onChange={e => this.setState({ tags: e.target.value })} />
					<br />
					<label>Title: </label>
					<input type="text" value={title} onChange={e => this.setState({ title: e.target.value })} />
					<br />
					<label>Content of the Questions: </label>
					<textarea
						rows="15"
						cols="80"
						value={content}
						onChange={e => this.setState({ content: e.target.value })}
					/>
				</form>
				<button onClick={this.submitForm.bind(this)}>Post Question</button>
			</div>
		);
	}
}

export default graphql(AddQuestion)(CreateQuestion);
