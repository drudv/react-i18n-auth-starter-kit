const jwt = require('jsonwebtoken');
const PassportLocalStrategy = require('passport-local').Strategy;
const IncorrectCredentialsError = require('../errors/IncorrectCredentialsError');
const config = require('../../config');
const compareHashAndPassword = require('../utils/compareHashAndPassword');
const db = require('../db');
const User = db.models.User;

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim()
  };

  // find a user by email address
  const where = {
    email: userData.email,
  };
  return User.findOne({ where })
    .then((user) => {
      compareHashAndPassword(user.getDataValue('password'), userData.password)
        .then(
          () => { // equal
            const payload = {
              sub: user.getDataValue('id'),
            };

            // create a token string
            const token = jwt.sign(payload, config.jwtSecret);
            const data = {
              name: user.getDataValue('name'),
            };

            done(null, token, data);
          },
          () => { // not equal
            done(new IncorrectCredentialsError('Incorrect email or password'));
          },
        );
    })
    .catch(error => done(error));
});
