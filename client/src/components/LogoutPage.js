import React from 'react';
import Auth from '../modules/Auth';
import { Redirect } from 'react-router-dom';

const LogoutPage = () => {
  Auth.deauthenticateUser();
  return <Redirect to="/" />;
};

export default LogoutPage;
