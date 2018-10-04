import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getQuestions } from '../../queries/queries.js';
import { BrowserRouter, Switch, Router, Route, NavLink, Redirect } from 'react-router-dom';
import { NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import QuestionItem from './QuestionItem.jsx';
import QuestionContent from './QuestionContent.jsx';

class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(id) {
    this.setState({
      selected: id,
    });
  }

  displayQuestions() {
    let data = this.props.data;
    if (data.loading) {
      return <div>Loading Questions...</div>;
    } else {
      this.props.data.refetch();
      return data.questions.map(post => {
        return <QuestionItem key={post.id} postData={post} onSelect={this.onSelect} />;
      });
    }
  }

	render() {
		console.log("I am selected" , this.state.selected)
		if (!this.state.selected) {
			return (
				<div>
					<div>{this.displayQuestions()}</div>
				</div>
			)
		} else {
			return (
			  <Redirect to={`/questionContent/${this.state.selected}`} />
			)}
	}
}

export default graphql(getQuestions)(QuestionList);
