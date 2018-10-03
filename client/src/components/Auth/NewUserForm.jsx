import React, { Component } from 'react';

class NewUserForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: ''
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentDidMount() {
		this.setState({ email: this.props.firebaseAuth.currentUser.email });
	}

	handleClick() {
		// if username is taken, don't allow click
		// if (username is unique)
		// save username + emailaddress(from firebase)
		// into database
	}

	handleInputChange(evt) {
		this.setState(
			{
				username: evt.target.value
			},
			() => {
				// query database to find if username is unique
				// if taken, don't allow click
			}
		);
	}

	render() {
		return (
			<div>
				<h3>Choose a username</h3>
				<form>
					<div>
						<input
							className="form-control"
							type="text"
							value={this.state.username}
							onChange={this.handleInputChange}
						/>
					</div>
					<div>
						<p>
							<button
								onClick={e => {
									e.preventDefault();
									this.handleClick();
								}}
							>
								Finish Registration
							</button>
						</p>
					</div>
				</form>
			</div>
		);
	}
}

export default NewUserForm;
