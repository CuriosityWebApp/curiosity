import React, { Component } from 'react';
import firebase, { database } from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Main from '../Main/Main.jsx';
import UsernameSubmit from './UsernameSubmit.jsx';
import Login from './Login.jsx';

firebase.initializeApp({
	apiKey: 'AIzaSyBF_AKIaEMjjU8E1ZLLjZXKTxykxhKjUG8',
	authDomain: 'curiosity-a9199.firebaseapp.com'
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSignedIn: true,
			email: '',
			userId: '5bb28b121723602d90864b71',
			loading: true,
			oAuthData: null
		};
		// this.finishRegistration = this.finishRegistration.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.authListener = this.authListener.bind(this);
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
				this.setState({
					loading: false,
					oAuthData: Object.assign({}, user.providerData[0])
				});
			} else {
				this.setState({
					loading: false,
					oAuthData: null
				});
			}
		});
	}

	handleLogout() {
		this.setState({
			oAuthData: null
		});

		firebase
			.auth()
			.signOut()
			.then(() => {
				return;
			})
			.catch(err => {
				console.error(err);
			});
	}

	render() {
		if (this.state.loading) {
			return <div>loading</div>;
		}
		return (
			<div>
				<Main
					userId={this.state.userId}
					oAuthData={this.state.oAuthData}
					logout={this.handleLogout}
					uiConfig={this.uiConfig}
					firebaseAuth={firebase.auth()}
				/>
			</div>
		);
	}
}

export default App;
