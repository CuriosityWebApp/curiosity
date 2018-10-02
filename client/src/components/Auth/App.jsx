import React, { Component } from 'react';
import firebase, { database } from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Main from '../Main/Main.jsx';
import QuestionList from '../Question/QuestionList.jsx';

firebase.initializeApp({
	apiKey: 'AIzaSyBF_AKIaEMjjU8E1ZLLjZXKTxykxhKjUG8',
	authDomain: 'curiosity-a9199.firebaseapp.com'
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSignedIn: true
		};
		// this.finishRegistration = this.finishRegistration.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
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
		firebase.auth().onAuthStateChanged(user => {
			this.setState({ isSignedIn: !!user });
		});
	};

	handleLogout() {
		firebaseAuth.signOut();
		this.setState({ signedIn: false });
	}
	render() {
		return (
			<div>
				{this.state.isSignedIn ? (
					<Main signedIn={this.state.isSignedIn} logout={this.handleLogout} />
				) : (
					<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
				)}
			</div>
		);
	}
}

export default App;
