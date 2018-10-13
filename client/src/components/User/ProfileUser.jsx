import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getUser } from '../../queries/queries.js';
import UserInfo from './UserInfo.jsx';
import UserWallet from './UserWallet.jsx';
import UserQuestions from './UserQuestions.jsx';
import UserAnswers from './UserAnswers.jsx';
import UserFavorites from './UserFavorites.jsx';

class ProfileUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 'info'
		};
	}

	render() {
		let { loading, error, user, refetch } = this.props.data;
		if (loading) {
			return <div>Loading...</div>;
		}
		if (error) {
			return <div>Error...</div>;
		} else {
			return (
				<div>
					<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
						<a className="navbar-brand" style={{ color: 'white' }}>
							{user.username}
							's Profile
						</a>
						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#navbarNavDropdown"
							aria-controls="navbarNavDropdown"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon" />
						</button>
						<div className="collapse navbar-collapse" id="navbarNavDropdown">
							<ul className="navbar-nav">
								<li className={this.state.activeTab === 'info' ? 'nav-item active' : 'nav-item'}>
									<a
										className="nav-link"
										onClick={() => {
											this.setState({ activeTab: 'info' });
										}}
										style={{
											cursor: 'pointer'
										}}
									>
										Info <span className="sr-only">(current)</span>
									</a>
								</li>
								<li className={this.state.activeTab === 'wallet' ? 'nav-item active' : 'nav-item'}>
									<a
										className="nav-link"
										onClick={() => {
											this.setState({ activeTab: 'wallet' });
										}}
										style={{
											cursor: 'pointer'
										}}
									>
										Wallet
									</a>
								</li>
								<li className={this.state.activeTab === 'questions' ? 'nav-item active' : 'nav-item'}>
									<a
										className="nav-link"
										onClick={() => {
											this.setState({ activeTab: 'questions' });
										}}
										style={{
											cursor: 'pointer'
										}}
									>
										Questions
									</a>
								</li>
								<li className={this.state.activeTab === 'answers' ? 'nav-item active' : 'nav-item'}>
									<a
										className="nav-link"
										onClick={() => {
											this.setState({ activeTab: 'answers' });
										}}
										style={{
											cursor: 'pointer'
										}}
									>
										Answers
									</a>
								</li>
								<li className={this.state.activeTab === 'favorites' ? 'nav-item active' : 'nav-item'}>
									<a
										className="nav-link"
										onClick={() => {
											this.setState({ activeTab: 'favorites' });
										}}
										style={{
											cursor: 'pointer'
										}}
									>
										Favorites
									</a>
								</li>
							</ul>
						</div>
					</nav>
					{this.state.activeTab === 'info' && <UserInfo user={user} />}
					{this.state.activeTab === 'wallet' && (
						<UserWallet user={user} data={this.props.data} refetcher={this.props.refetcher} />
					)}
					{this.state.activeTab === 'questions' && <UserQuestions questions={user.questions} />}
					{this.state.activeTab === 'answers' && <UserAnswers answers={user.answers} />}
					{this.state.activeTab === 'favorites' && <UserFavorites user={user} refetchTags={refetch} />}
				</div>
			);
		}
	}
}

export default graphql(getUser, {
	options: props => {
		return {
			variables: {
				id: props.id
			}
		};
	}
})(ProfileUser);
