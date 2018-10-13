import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search/Search.jsx';
import { LinkContainer } from 'react-router-bootstrap';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let signedIn = this.props.signedIn;
    if (signedIn) {
      var { username, rank, credit, messages, questions, avatarUrl } = this.props.user;
    } else {
      var username = '';
      var credit = 0;
      var rank = 0;
      var messages = [];
      var questions = [];
    }

    let unreadMessages = 0;
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].unread === true) {
        unreadMessages++;
      }
    }
    let unreadNotifications = 0;
    for (let j = 0; j < questions.length; j++) {
      for (let k = 0; k < questions[j].answers.length; k++) {
        if (questions[j].answers[k].questionerSeen === false) {
          unreadNotifications++;
        }
      }
    }
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
                  <img
                    className="rounded-circle"
                    src={avatarUrl}
                    style={{ width: '50px', height: '50px' }}
                  />
                </a>
                <div className="media-body">
                  <h5 className="media-heading">
                    Welcome <span>{username}</span>
                  </h5>
                  <small>{rank} Rank</small>
                  <br />
                  <small>{credit} Credits</small>
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
                    <Link to="/">
                      <div>
                        <i className="fas fa-list" />
                        Question List
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="card" style={{ cursor: 'pointer' }}>
                  <div className="card-header">
                    <Link to="/createQuestion">
                      <div>
                        <i className="fas fa-question" />
                        Ask Question
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="card" style={{ cursor: 'pointer' }}>
                  <div className="card-header">
                    <Link to="/profileUser">
                      <div>
                        <i className="fas fa-user" />
                        Profile
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="card" style={{ cursor: 'pointer' }}>
                  <div className="card-header">
                    <div>
                      <i className="fas fa-envelope" />
                      Messages
                      {unreadMessages > 0 && <span className="label">New</span>}
                    </div>
                  </div>
                </div>
                <div className="card">
                  <ul className="list-group list-group-flush">
                    <Link to="/privatemessage" style={{ cursor: 'pointer' }}>
                      <li className="list-group-item">
                        <span>Create Message</span>
                      </li>
                    </Link>
                    <Link to="/messages/unread" style={{ cursor: 'pointer' }}>
                      <li className="list-group-item">
                        <span>Unread</span>
                      </li>
                    </Link>
                    <Link to="/messages/inbox" style={{ cursor: 'pointer' }}>
                      <li className="list-group-item">
                        <span>Inbox</span>
                      </li>
                    </Link>
                    <Link to="/messages/sent" style={{ cursor: 'pointer' }}>
                      <li className="list-group-item">
                        <span>Sent</span>
                      </li>
                    </Link>
                  </ul>
                </div>
                <div className="card" style={{ cursor: 'pointer' }}>
                  <div className="card-header">
                    <Link to="/notifications">
                      <div>
                        <i className="fas fa-bell" />
                        Notifications
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="card" style={{ cursor: 'pointer' }}>
                  <div className="card-header">
                    <Link
                      to="/"
                      onClick={e => {
                        this.props.handleLogout();
                      }}
                    >
                      <div>
                        <i className="fas fa-sign-out-alt" />
                        Log Out
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="card" style={{ cursor: 'pointer' }}>
                  <div className="card-header">
                    <LinkContainer to="/">
                      <div>
                        <i className="fas fa-list" />
                        Question List
                      </div>
                    </LinkContainer>
                  </div>
                </div>
                <div className="card" style={{ cursor: 'pointer' }}>
                  <div className="card-header">
                    <LinkContainer to="/login">
                      <div>
                        <i className="fas fa-sign-in-alt" />
                        Login
                      </div>
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
                  <Link to="/messages/unread" className="icon-circle">
                    <i className="fas fa-envelope" />
                    {unreadMessages > 0 && (
                      <span className="badge badge-danger">{unreadMessages}</span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link to="/notifications" className="icon-circle">
                    <i className="fas fa-bell" />
                    {unreadNotifications > 0 && (
                      <span className="badge badge-success">{unreadNotifications}</span>
                    )}
                  </Link>
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
