import React, { Component } from 'react';

const UserInfo = ({ user }) => {
  return (
    <div className="card">
      <strong>User Info</strong>
      <div className="card-body">
        E-Mail: {user.email}
        <br />
        Username: {user.username}
        <br />
        Rank: {user.rank}
        <br />
        Credit: {user.credit}
      </div>
    </div>
  );
};

export default UserInfo;
