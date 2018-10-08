import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getQuestions } from '../../queries/queries.js';
import { Redirect } from 'react-router-dom';
import QuestionItem from './QuestionItem.jsx';

class QuestionList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: null
		};
		this.onSelect = this.onSelect.bind(this);
		this.onScroll = this.onScroll.bind(this);
	}

	componentDidMount() {
		window.addEventListener('scroll', this.onScroll, false);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll, false);
	}

	onScroll = () => {
		if (
			window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
			this.props.data.questions.length
		) {
			console.log('reached the bottom of the page');
		}
	};
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
			this.props.data.refetch();
			return data.questions.map(post => {
				return (
					<QuestionItem
						key={post.id}
						postData={post}
						onSelect={this.onSelect}
						userId={this.props.userId}
						refetch={this.props.data.refetch}
						ratedUp={post.ratedUpBy}
					/>
				);
			});
		}
	}

	render() {
		if (!this.state.selected) {
			return (
				<div>
					<h2>
						<u>Questions</u>{' '}
					</h2>
					<div>{this.displayQuestions()}</div>
				</div>
			);
		} else {
			return <Redirect to={`/questionContent/${this.state.selected}`} />;
		}
	}
}

export default graphql(getQuestions)(QuestionList);
