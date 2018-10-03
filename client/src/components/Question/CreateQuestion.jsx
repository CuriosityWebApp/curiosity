import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { AddQuestion } from '../../mutations/mutations.js';

class CreateQuestion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			content: '',
			bounty: 0,
			category: '',
			restriction: '',
			tags: ''
		};
		this.displayCategories = this.displayCategories.bind(this);
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
		console.log('State of the CreateQuestion: ', this.state, this.props.userId);
		e.preventDefault();
		this.props
			.mutate({
				mutation: AddQuestion,
				variables: {
					userId: this.props.userId,
					questionTitle: this.state.title,
					questionContent: this.state.content,
					bounty: Number(this.state.bounty),
					category: this.state.category,
					restriction: Number(this.state.restriction),
					tags: this.state.tags.split(' ')
				}
			})
			.then(data => {
				console.log('success', data);
			})
			.catch(err => console.log('error bro', err));
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
					<select onChange={e => this.setState({ category: e.target.value })}>
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
					<label>Tags (#name): </label>
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
