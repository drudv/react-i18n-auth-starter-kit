import React from 'react';
import ReactDom from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.less';

import HomePage from './components/HomePage';
import DashboardPage from './containers/DashboardPage';
import LoginPage from './containers/LoginPage';
import LogoutPage from './components/LogoutPage';
import SignUpPage from './containers/SignUpPage';

import './i18n';

ReactDom.render(
  (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={LogoutPage} />
        <Route path="/signup" component={SignUpPage} />
      </Switch>
    </BrowserRouter>
  ),
  document.getElementById('react-app')
);
