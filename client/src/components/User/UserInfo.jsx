import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UpdateUserAvatar from './UpdateUserAvatar.jsx';
import UserWallet from './UserWallet.jsx';
import UserFavorites from './UserFavorites.jsx';
import moment from 'moment';

const UserInfo = ({ user, refetch, notify, data }) => {
  let counter = 0;
  user.answers.map(answer => {
    if (answer.answerChosen) {
      counter++;
    }
  });
  return (
    <div>
      <div
        className="row"
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center',
        }}
      >
        <div
          className="col-12 col-sm-3"
          style={{
            marginTop: '30px',
          }}
        >
          <img
            src={user.avatarUrl}
            className="rounded-circle"
            style={{ width: '160px', height: '160px' }}
          />
          <br />
          <div className="basicMargin">
            <UpdateUserAvatar id={user.id} refetch={refetch} notify={notify} />
          </div>
          <strong>{user.username}</strong>
          <div>
            <em>Member since </em>
            {moment(user.createdAt).format('LL')}
          </div>
          <br />
          <div style={{ fontFamily: 'Impact', marginTop: '20px' }}>My Favorite Tags</div>
          <div>
            {user.favoriteTags.map((tag, i) => {
              return (
                <span className="badge badge-info " key={i} style={{ margin: '2px' }}>
                  {tag}
                </span>
              );
            })}
          </div>
          <div className="basicMargin">
            <UserFavorites user={user} refetchTags={refetch} notify={notify} />
          </div>
        </div>
        <div className="col-12 col-sm-9">
          <UserWallet user={user} data={data} refetch={refetch} notify={notify} />
        </div>
      </div>
      <div className="row" style={{ marginLeft: '65px', marginRight: '65px', marginTop: '30px' }}>
        <div className="col-12 col-sm-3">
          <Link to={`user/${user.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <div className="card mb-3 smallComponentColor">
              <div
                className="card-body"
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  textAlign: 'center',
                }}
              >
                <i className="fas fa-question" /> Questions {user.questions.length}
              </div>
            </div>
          </Link>
        </div>
        <div className="col-12 col-sm-3">
          <Link to={`user/${user.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <div className="card mb-3 smallComponentColor">
              {' '}
              <div
                className="card-body"
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  textAlign: 'center',
                }}
              >
                <i className="far fa-comment-dots" /> Answers {user.answers.length}
              </div>
            </div>
          </Link>
        </div>
        <div className="col-12 col-sm-3">
          <Link to={`user/${user.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <div className="card mb-3 smallComponentColor">
              {' '}
              <div
                className="card-body"
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  textAlign: 'center',
                }}
              >
                <i className="fas fa-crown" /> Best Answers {counter}
              </div>
            </div>
          </Link>
        </div>
        <div className="col-12 col-sm-3">
          <div className="card mb-3 smallComponentColor">
            {' '}
            <div
              className="card-body"
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                textAlign: 'center',
              }}
            >
              <i className="fas fa-award" /> Points {user.rank}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
