import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search/Search.jsx';
import { LinkContainer } from 'react-router-bootstrap';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { username, signedIn, rank, credits, id, email } = this.props.user;
    let unreadMessages = 0;
    for (let i = 0; i < this.props.messages.length; i++) {
      if (this.props.messages[i].unread === true) {
        unreadMessages++;
      }
    }
    let unreadNotifications = 0;
    for (let j = 0; j < this.props.questions.length; j++) {
      for (let k = 0; k < this.props.questions[j].answers.length; k++) {
        if (this.props.questions[j].answers[k].questionerSeen === false) {
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
                    <Link to="/">
                      <div>
                        <i className="fa fa-list" />
                        Question List
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="card" style={{ cursor: 'pointer' }}>
                  <div className="card-header">
                    <Link to="/createQuestion">
                      <div>
                        <i className="fa fa-question" />
                        Ask Question
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="card" style={{ cursor: 'pointer' }}>
                  <div className="card-header">
                    <Link to="/profileUser">
                      <div>
                        <i className="fa fa-user" />
                        Profile
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="card" style={{ cursor: 'pointer' }}>
                  <div className="card-header">
                    <div>
                      <i className="fa fa-envelope-o" />
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
                        <i className="fa fa-bell" />
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
                        this.props.logout();
                      }}
                    >
                      <div>
                        <i className="fa fa-sign-out" />
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
                        <i className="fa fa-list" />
                        Question List
                      </div>
                    </LinkContainer>
                  </div>
                </div>
                <div className="card" style={{ cursor: 'pointer' }}>
                  <div className="card-header">
                    <LinkContainer to="/login">
                      <div>
                        <i className="fa fa-sign-in" />
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
                  <Link to="/messages/new" className="icon-circle">
                    <i className="fa fa-envelope-o" />
                    {unreadMessages > 0 && (
                      <span className="badge badge-danger">{unreadMessages}</span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link to="/notifications" className="icon-circle">
                    <i className="fa fa-bell-o" />
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
