import React, { Component } from 'react';

class QuestionNavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filterBy: '',
			range: null,
			topic: ''
		};
		this.displayCategories = this.displayCategories.bind(this);
		this.handleFilterTopics = this.handleFilterTopics.bind(this);
		this.handleSortTopics = this.handleSortTopics.bind(this);
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
	handleFilterChange(e) {
		e.preventDefault();

		this.setState({ filterBy: e.target.value });
	}
	handleSortTopics(e, value, range) {
		let topic = value || this.state.topic;
		let days = range || this.state.range;
		this.props.sortQuestions(e, topic, days);
	}

	handleFilterTopics(e) {
		e.preventDefault();
		this.props.filterQuestions(e, this.state.filterBy, this.state.range);
	}
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="navbar-collapse collapse show" id="navbarColor01">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">
							<a className="nav-link" href="/">
								Home
							</a>
						</li>
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								id="navbarTop"
								role="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								Top
							</a>
							<div className="dropdown-menu" aria-labelledby="navbarTop">
								<a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'top', null)}>
									All time
								</a>
								<a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'top', '1')}>
									Today
								</a>
								<a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'top', '7')}>
									1 Week
								</a>
								<a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'top', '30')}>
									1 Month
								</a>
							</div>
						</li>
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								id="navbarHot"
								role="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								Hot
							</a>
							<div className="dropdown-menu" aria-labelledby="navbarHot">
								<a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'views', null)}>
									All time
								</a>
								<a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'views', '1')}>
									Today
								</a>
								<a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'views', '7')}>
									1 Week
								</a>
								<a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'views', '30')}>
									1 Month
								</a>
							</div>
						</li>
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								id="navbarNew"
								role="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								New
							</a>
							<div className="dropdown-menu" aria-labelledby="navbarNew">
								<a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'createdAt', null)}>
									All time
								</a>
								<a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'createdAt', '1')}>
									Today
								</a>
								<a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'createdAt', '7')}>
									1 Week
								</a>
								<a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'createdAt', '30')}>
									1 Month
								</a>
							</div>
						</li>
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								id="navbarBounty"
								role="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								Top Bounty
							</a>
							<div className="dropdown-menu" aria-labelledby="navbarBounty">
								<a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'bounty', null)}>
									All time
								</a>
								<a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'bounty', '1')}>
									Today
								</a>
								<a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'bounty', '7')}>
									1 Week
								</a>
								<a className="dropdown-item" onClick={e => this.handleSortTopics(e, 'bounty', '30')}>
									1 Month
								</a>
							</div>
						</li>{' '}
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								id="navbarRecommendation"
								role="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								Recommendations
							</a>
							<div className="dropdown-menu" aria-labelledby="navbarRecommendation">
								<a
									className="dropdown-item"
									onClick={e => this.handleSortTopics(e, 'recommendation', null)}
								>
									All time
								</a>
								<a
									className="dropdown-item"
									onClick={e => this.handleSortTopics(e, 'recommendation', '1')}
								>
									Today
								</a>
								<a
									className="dropdown-item"
									onClick={e => this.handleSortTopics(e, 'recommendation', '7')}
								>
									1 Week
								</a>
								<a
									className="dropdown-item"
									onClick={e => this.handleSortTopics(e, 'recommendation', '30')}
								>
									1 Month
								</a>
							</div>
						</li>{' '}
					</ul>
					<form className="form-inline">
						<select onChange={this.handleFilterChange.bind(this)}>
							<option>Select Category</option>
							{this.displayCategories()}
						</select>{' '}
						<button
							className="btn btn-outline-info my-2 my-sm-0"
							type="submit"
							onClick={this.handleFilterTopics}
						>
							Submit
						</button>
					</form>
				</div>
			</nav>
		);
	}
}

export default QuestionNavBar;
