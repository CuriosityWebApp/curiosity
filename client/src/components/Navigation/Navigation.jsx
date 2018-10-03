import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Logout from '../Auth/Logout.jsx';

const Navigation = ({ oAuthData, logout }) => {
	return (
		<div>
			{oAuthData ? (
				<ul>
					<li>
						<NavLink to="/">Main Page</NavLink>
					</li>
					<li>
						<NavLink to="/createQuestion">Ask Question</NavLink>
					</li>
					<LinkContainer to="/">
            <NavItem onClick={ logout }>
              Logout
            </NavItem>
          </LinkContainer>
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
