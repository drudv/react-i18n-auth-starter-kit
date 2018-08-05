const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const Sequelize = require('sequelize');
const config = require('./config');

const app = express();
// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
app.use('/locales', express.static('./locales'));
// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authorization checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
const pagesRoutes = require('./server/routes/pages');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/', pagesRoutes);


// start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});
