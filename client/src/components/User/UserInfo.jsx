import React, { Component } from 'react';

const UserInfo = ({ user }) => {
  return (
    <div className="card">
      <strong>User Info</strong>
      <div className="card-body">
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
