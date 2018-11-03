const PassportLocalStrategy = require('passport-local').Strategy;
const hashPassword = require('../utils/hashPassword');
const generateToken = require('../utils/generateToken');
const db = require('../db');
const { TOKEN_TYPE_ACTIVATE_USER } = require('../constants');
const User = db.models.User;
const Token = db.models.Token;

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,
  },
  (req, email, password, done) => {
    hashPassword(password)
      .then(hash => {
        const userData = {
          email: email.toLowerCase(),
          password: hash,
          name: req.body.name,
          active: false,
        };
        return db.sequelize.transaction(transaction => {
          return User.create(userData, { transaction })
            .then(user => {
              const tokenData = {
                token: generateToken(),
                userId: user.id,
                tokenType: TOKEN_TYPE_ACTIVATE_USER,
              };
              return Promise.all([
                user,
                Token.create(tokenData, { transaction })
              ]);
            })
            .then(([user, token]) => {
              done(null, { ...user, token: token.token });
            });
        });
      })
      .catch(error => {
        console.log('error', error);
        done(error);
      });
  }
);
