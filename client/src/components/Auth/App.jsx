import React, { Component } from 'react';
import firebase, { database } from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Main from '../Main/Main.jsx';
import { checkUserEmail } from '../../queries/queries.js';
import { withApollo } from 'react-apollo';

firebase.initializeApp({
	apiKey: 'AIzaSyBF_AKIaEMjjU8E1ZLLjZXKTxykxhKjUG8',
	authDomain: 'curiosity-a9199.firebaseapp.com'
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.handleLogout = this.handleLogout.bind(this);
		this.authListener = this.authListener.bind(this);
		this.getUser = this.getUser.bind(this);
	}

	
	uiConfig = {
		signInFlow: 'popup',
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.FacebookAuthProvider.PROVIDER_ID,
			firebase.auth.TwitterAuthProvider.PROVIDER_ID,
			firebase.auth.GithubAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID
		],
		callbacks: {
			signInSuccessWithAuthResult: () => false
		}
	};

	componentDidMount = () => {
		this.authListener();
	};

	authListener() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.getUser(user.email);
			} else {
				console.log('wrong user');
			}
		});
	}

	getUser = async email => {
		const userId = await this.props.client
			.query({
				query: checkUserEmail,
				variables: {
					email: email
				}
			})
			.then(({ data }) => {
				if (data.checkUserEmail.id) {
					this.props.setUser(data.checkUserEmail, true, email);
				}
			})
			.catch(err => console.log('you got an error', err));
	};

	handleLogout() {
		let noUser = {
			id: undefined,
			username: undefined,
			credits: 0,
			rank: 0
		};
		firebase
			.auth()
			.signOut()
			.then(() => {
				this.props.setUser(noUser, false, undefined);
			})
			.catch(err => {
				console.error(err);
			});
	}

	render() {
		return (
			<div>
				<Main
					setUser={this.props.setUser}
					user={this.props.user}
					logout={this.handleLogout}
					uiConfig={this.uiConfig}
					firebaseAuth={firebase.auth()}
				/>
			</div>
		);
	}
}

export default withApollo(App);
