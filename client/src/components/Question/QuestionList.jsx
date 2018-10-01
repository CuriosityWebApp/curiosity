import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getQuestions } from '../../queries/queries.js';

import QuestionItem from './QuestionItem.jsx';

class QuestionList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: null
		};
	}
	displayQuestions() {
		let data = this.props.data;
		console.log('Data in display questions', data);
		if (data.loading) {
			return <div>Loading Questions...</div>;
		} else {
			return data.questions.map(post => {
				return <QuestionItem key={post.id} postData={post} />;
			});
		}
	}

	render() {
		return (
			<div>
				<h3>Top Questions</h3>
				<ul>{this.displayQuestions()}</ul>
			</div>
		);
	}
}

export default graphql(getQuestions)(QuestionList);
