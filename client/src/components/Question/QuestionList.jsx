import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getQuestions } from '../../queries/queries.js';

import QuestionItem from './QuestionItem.jsx';
import QuestionContent from './QuestionContent.jsx';

class QuestionList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: null
		};
		this.onSelect = this.onSelect.bind(this);
	}

	onSelect(id) {
		this.setState({
			selected: id
		});
	}

	displayQuestions() {
		let data = this.props.data;
		if (data.loading) {
			return <div>Loading Questions...</div>;
		} else {
			return data.questions.map(post => {
				return <QuestionItem key={post.id} postData={post} onSelect={this.onSelect} />;
			});
		}
	}

	render() {
		if (!this.state.selected) {
			return (
				<div>
					<h3>Top Questions</h3>
					<ul>{this.displayQuestions()}</ul>
				</div>
			);
		} else {
			return <QuestionContent id={this.state.selected} />;
		}
	}
}

export default graphql(getQuestions)(QuestionList);
