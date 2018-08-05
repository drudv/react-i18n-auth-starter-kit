import React from 'react';
import ReactDom from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import HomePage from './components/HomePage';
import DashboardPage from './containers/DashboardPage';
import LoginPage from './containers/LoginPage';
import LogoutPage from './components/LogoutPage';
import SignUpPage from './containers/SignUpPage';

import './i18n';

const theme = createMuiTheme({});

ReactDom.render(
  (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/logout" component={LogoutPage} />
          <Route path="/signup" component={SignUpPage} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  ),
  document.getElementById('react-app')
);
