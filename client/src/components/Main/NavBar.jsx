import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search/Search.jsx';
import { LinkContainer } from 'react-router-bootstrap';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { username, signedIn, rank, credits, id, email } = this.props.user;
    return (
      <div id="snb">
        <nav id="mysidenav_lft" className="sidenav" style={{ width: '250px' }}>
          <a className="graduation">
            <span className="pl-2">Curiosity</span>
          </a>
          <div className="profile-box">
            {signedIn ? (
              <div className="media">
                <a className="pull-left pt-2">
                  <img className="rounded-circle" src="http://via.placeholder.com/40x40" />
                </a>
                <div className="media-body">
                  <h5 className="media-heading">
                    Welcome <span>{username}</span>
                  </h5>
                  <small>{rank} Rank</small>
                  <br />
                  <small>{credits} Credits</small>
                </div>
              </div>
            ) : (
              <div className="media">
                <a className="pull-left pt-2">
                  <img className="rounded-circle" src="http://via.placeholder.com/40x40" />
                </a>
                <div className="media-body">
                  <h5 className="media-heading">Please</h5>
                  <h5>Login</h5>
                </div>
              </div>
            )}
          </div>
          <div className="accordion" id="accordion_sidenav_lft">
            {signedIn ? (
              <div>
                <div className="card" style={{ cursor: 'pointer' }}>
                  <div className="card-header">
                    <LinkContainer to="/">
                      <div>Question List</div>
                    </LinkContainer>
                  </div>
                </div>
                <div className="card" style={{ cursor: 'pointer' }}>
                  <div className="card-header">
                    <LinkContainer to="/createQuestion">
                      <div>Ask Question</div>
                    </LinkContainer>
                  </div>
                </div>
                <div className="card" style={{ cursor: 'pointer' }}>
                  <div className="card-header">
                    <LinkContainer to="/profileUser">
                      <div>Profile</div>
                    </LinkContainer>
                  </div>
                </div>
                <div className="card" style={{ cursor: 'pointer' }}>
                  <div className="card-header">
                    <Link
                      to="/"
                      onClick={e => {
                        this.props.logout();
                      }}
                    >
                      Log Out
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="card" style={{ cursor: 'pointer' }}>
                  <div className="card-header">
                    <LinkContainer to="/">
                      <div>Question List</div>
                    </LinkContainer>
                  </div>
                </div>
                <div className="card" style={{ cursor: 'pointer' }}>
                  <div className="card-header">
                    <LinkContainer to="/login">
                      <div>Login</div>
                    </LinkContainer>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
        <div id="sidenav_rgt" style={{ marginLeft: '250px' }}>
          <div className="container-fluid">
            <span className="sidebar_icon">
              <ul className="left-navbar">
                <Search />
              </ul>
              <ul className="right-navbar">
                <li>
                  <a href="#" className="icon-circle">
                    <i className="fa fa-envelope-o" />
                    <span className="badge badge-danger">5</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="icon-circle">
                    <i className="fa fa-bell-o" />
                    <span className="badge badge-success">6</span>
                  </a>
                </li>
              </ul>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
