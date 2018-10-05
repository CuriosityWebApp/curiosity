import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { AddQuestion, UpdateCredit } from '../../mutations/mutations.js';
import { Redirect } from 'react-router-dom';

class CreateQuestion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: undefined,
			content: undefined,
			bounty: 0,
			category: undefined,
			restriction: undefined,
			tags: undefined,
			redirect: false
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
		let { title, content, restriction } = this.state;
		let splittedTags = this.state.tags;

		if (this.props.credits < Number(this.state.bounty)) {
			alert("You have insufficient credit!")
		}
		if (this.state.tags) {
			splittedTags = this.state.tags.split(' ');
		}

		if (!title || !content || !restriction) {
			alert("Can't post an empty question!");
		} else if (this.props.credits < Number(this.state.bounty)) {
			alert("You have insufficient credit!")
		} else {
			this.props
				.AddQuestion({
					mutation: AddQuestion,
					variables: {
						userId: this.props.userId,
						questionTitle: this.state.title,
						questionContent: this.state.content,
						bounty: Number(this.state.bounty),
						category: this.state.category,
						restriction: Number(this.state.restriction),
						tags: splittedTags
					}
				})
				.then(data => {
					this.props.UpdateCredit({
						mutation: UpdateCredit,
						variables: {
							id: this.props.userId,
							credit: Number(this.state.bounty*-1)
						}
					})
				})
				.then(data => this.setState({ redirect: true }))
				.catch(err => console.log('error bro', err));
		  }
	}

	render() {
		const { title, content, bounty, category, restriction, tags, redirect } = this.state;
		if (redirect) {
			return <Redirect to="/" />;
		} else {
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
}

export default compose(
	graphql(AddQuestion, { name: "AddQuestion" }),
	graphql(UpdateCredit, { name: "UpdateCredit"})
)(CreateQuestion)
