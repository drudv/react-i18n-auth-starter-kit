const PassportLocalStrategy = require('passport-local').Strategy;
const hashPassword = require('../utils/hashPassword');
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

  hashPassword(password)
    .then(hash => {
      const userData = {
        email,
        password: hash,
        name: req.body.name,
      };

      return User.create(userData)
        .then(() => {
          done(null)
        });
    })
    .catch(error => {
      done(error);
    });
});
