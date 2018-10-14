import React, { Component } from 'react';
import UpdateUserAvatar from './UpdateUserAvatar.jsx';

const UserInfo = ({ user, refetcher, notify }) => {
  return (
    <div className="card">
      <strong>User Info</strong>
      <div className="card-body">
        <UpdateUserAvatar id={user.id} refetcher={refetcher} notify={notify} /> <br />
        <strong>E-Mail: </strong>
        {user.email}
        <br />
        <strong>Username: </strong>
        {user.username}
        <br />
        <strong>Rank: </strong>
        {user.rank}
        <br />
        <strong>Credits: </strong>
        {user.credit}
      </div>
    </div>
  );
};

export default UserInfo;
