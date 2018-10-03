import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const Logout = ({ uiConfig, firebaseAuth }) => {
	return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth}/>
  )
};

export default Logout;