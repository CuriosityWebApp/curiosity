import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Login from '../Auth/Logout.jsx';

const Navigation = ({ oAuthData, logout }) => {
	return (
		<div>
			{oAuthData ? (
				<ul>
					<LinkContainer to="/">
            <NavItem>
              Main Page
            </NavItem>
          </LinkContainer>
					<LinkContainer to="/createQuestion">
            <NavItem>
              Ask Question
            </NavItem>
          </LinkContainer>
					<LinkContainer to="/">
            <NavItem onClick={ (e) => {e.preventDefault(); logout(); this.props.handleLogout()} }>
              Log Out
            </NavItem>
          </LinkContainer>
					<LinkContainer to="/profileUser">
            <NavItem>
              Profile
            </NavItem>
          </LinkContainer>
				</ul>
			) : (
				<ul>
				  <LinkContainer to="/">
            <NavItem>
              Main Page
            </NavItem>
          </LinkContainer>
					<LinkContainer to="/login">
            <NavItem>
              Login
            </NavItem>
          </LinkContainer>
				</ul>
			)}
		</div>
	);
};

export default Navigation;
