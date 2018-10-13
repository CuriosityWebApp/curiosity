import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { getQuestions } from '../../queries/queries.js';
import _ from 'lodash';
import QuestionItem from './QuestionItem.jsx';
import QuestionNavBar from './QuestionNavBar.jsx';

class QuestionList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			skip: 0,
			questions: [],
			filterBy: '',
			sortBy: '',
			range: null
		};
		this.onScroll = this.onScroll.bind(this);
		this.getNextQuestions = this.getNextQuestions;
		this.throttledQuestionCall = _.throttle(this.getNextQuestions, this.state.sortBy === 'top' ? 700 : 500, {
			leading: false
		}).bind(this);
		this.filterQuestions = this.filterQuestions.bind(this);
		this.sortQuestions = this.sortQuestions.bind(this);
	}
	componentDidMount() {
		this.throttledQuestionCall();
		window.addEventListener('scroll', this.onScroll, false);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll, false);
	}

	onScroll = () => {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400 && this.state.questions.length) {
			window.removeEventListener('scroll', this.onScroll, false);
			this.throttledQuestionCall();
		}
	};

	sortQuestions = async (e, method, range) => {
		e ? e.preventDefault() : '';
		await this.setState({ sortBy: method, skip: 0, questions: [], range: range }, () => {
			this.props.client
				.query({
					query: getQuestions,
					variables: {
						limit: 15,
						skip: this.state.skip,
						filter: this.state.filterBy,
						sortBy: this.state.sortBy,
						range: this.state.range
					}
				})
				.then(({ data }) => {
					let newQuestions = this.state.questions.concat(data.questions);
					this.setState({ questions: newQuestions, skip: this.state.skip + 15 });
					window.addEventListener('scroll', this.onScroll, false);
				});
		});
	};

	filterQuestions = async (e, category, range) => {
		e.preventDefault();

		await this.setState({ filterBy: category, skip: 0, questions: [], range: range }, () => {
			this.props.client
				.query({
					query: getQuestions,
					variables: {
						limit: 15,
						skip: this.state.skip,
						filter: this.state.filterBy,
						sortBy: this.state.sortBy,
						range: this.state.range
					}
				})
				.then(({ data }) => {
					let newQuestions = this.state.questions.concat(data.questions);

					this.setState({ questions: newQuestions, skip: this.state.skip + 15 });
					window.addEventListener('scroll', this.onScroll, false);
				});
		});
	};

	getNextQuestions = async () => {
		await this.props.client
			.query({
				query: getQuestions,
				variables: {
					limit: 15,
					skip: this.state.skip,
					filter: this.state.filterBy,
					sortBy: this.state.sortBy,
					range: this.state.range
				}
			})
			.then(({ data }) => {
				let newProps = this.state.questions.concat(data.questions);
				let next;
				data.questions.length ? (next = this.state.skip + 15) : (next = this.state.questions.length);
				this.setState({ questions: newProps, skip: next }, () => {});
			})
			.then(() => window.addEventListener('scroll', this.onScroll, false))
			.catch(err => console.log('error in nextquestions', err));
	};

	displayQuestions() {
		if (this.props.data.loading) {
			return <div>Loading Questions...</div>;
		} else {
			let data = this.state.questions.length > 0 ? this.state.questions : this.props.data.questions;

			return data.map(post => {
				return (
					<QuestionItem
						key={post.id}
						questionId={post.id}
						onSelect={this.onSelect}
						userId={this.props.userId}
					/>
				);
			});
		}
	}

	render() {
		let filter = this.state.filterBy ? <span className="badge badge-warning">{this.state.filterBy}</span> : '';
		let sorted = this.state.sortBy ? (
			this.state.sortBy !== 'createdAt' ? (
				<span className="badge badge-warning">{this.state.sortBy}</span>
			) : (
				<span className="badge badge-warning">New first</span>
			)
		) : (
			''
		);
		let range = this.state.range ? (
			this.state.range > 1 ? (
				<span className="badge badge-warning">{this.state.range} days</span>
			) : (
				<span className="badge badge-warning">Today</span>
			)
		) : (
			<span className="badge badge-warning">All time</span>
		);
		return (
			<div>
				<QuestionNavBar sortQuestions={this.sortQuestions} filterQuestions={this.filterQuestions} />
				<span className="badge badge-primary">Filtered by: </span> {filter} {sorted} {range}
				<div />
				{this.displayQuestions()}
				<div>
					<h3> You read all of it! Check back later...</h3>
				</div>
			</div>
		);
	}
}

export default compose(
	withApollo,
	graphql(getQuestions, {
		options: () => {
			return {
				variables: {
					limit: 15,
					skip: 0,
					filter: '',
					sortBy: '',
					range: null
				}
			};
		}
	})
)(QuestionList);
