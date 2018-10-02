import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Logout from '../Auth/Logout.jsx';

const Navigation = ({ signedIn, logout }) => {
	return (
		<div>
			{signedIn ? (
				<ul>
					<li>
						<NavLink to="/">Main Page</NavLink>
					</li>
					<li>
						<NavLink to="/createQuestion">Ask Question</NavLink>
					</li>
					<li>
						<Logout logout={logout} />
					</li>
				</ul>
			) : (
				<ul>
					<li>
						<NavLink to="/">Main Page</NavLink>
					</li>
					<li>
						<NavLink to="/login">Login</NavLink>
					</li>
					<li>
						<NavLink to="/signup">Sign Up</NavLink>{' '}
					</li>
				</ul>
			)}
		</div>
	);
};

export default Navigation;
