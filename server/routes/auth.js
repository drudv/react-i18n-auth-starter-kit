const { template, get } = require('lodash');
const express = require('express');
const url = require('url');
const validator = require('validator');
const passport = require('passport');

const translate = require('../utils/translate');
const sendMail = require('../utils/sendMail');
const errorToText = require('../utils/errorToText');
const config = require('../../config');

const db = require('../db');
const { TOKEN_TYPE_ACTIVATE_USER } = require('../constants');
const User = db.models.User;
const Token = db.models.Token;

const router = new express.Router();

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (
    !payload ||
    typeof payload.email !== 'string' ||
    !validator.isEmail(payload.email)
  ) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (
    !payload ||
    typeof payload.password !== 'string' ||
    payload.password.trim().length < 8
  ) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (
    !payload ||
    typeof payload.name !== 'string' ||
    payload.name.trim().length === 0
  ) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors,
  };
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (
    !payload ||
    typeof payload.email !== 'string' ||
    payload.email.trim().length === 0
  ) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }

  if (
    !payload ||
    typeof payload.password !== 'string' ||
    payload.password.trim().length === 0
  ) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors,
  };
}

router.post('/signup', (req, res, next) => {
  const lang = req.body.lang || 'en';
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors,
    });
  }

  return passport.authenticate('local-signup', (err, { user, token }) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors.',
          errors: {
            email: 'This email is already taken.',
          },
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.',
      });
    }

    // don't block the response, send the confirmail email in parallel
    sendMail({
      serverHost: config.mailServerHost,
      serverPort: config.mailServerPort,
      serverSecure: config.mailServerSecure,
      serverUser: config.mailServerUser,
      serverPassword: config.mailServerPassword,
      from: config.mailSender,
      to: req.body.email,
      subject: translate(lang, 'activate-account'),
      text: template(translate(lang, 'activation-mail-text'))({
        name: user.name,
        email: user.email,
        link: `${req.protocol}://${req.get(
          'host'
        )}/auth/confirm-email?token=${encodeURIComponent(token)}`,
      }),
    }).catch(error => {
      console.error(error);
    });

    return res.status(200).json({
      success: true,
      message:
        'You have successfully signed up! Now you should be able to log in.',
    });
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors,
    });
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.',
      });
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData,
    });
  })(req, res, next);
});

router.get('/confirm-email', (req, res, next) => {
  const urlParts = url.parse(req.url, true);
  const token = get(urlParts.query, 'token');
  return db.sequelize
    .transaction(transaction => {
      return User.findOne(
        {
          where: {
            '$tokens.token$': token,
            '$tokens.tokenType$': TOKEN_TYPE_ACTIVATE_USER,
          },
          include: [
            {
              model: Token,
              as: 'tokens',
            },
          ],
        },
        { transaction }
      ).then(user => {
        return Promise.all([
          user.updateAttributes({ active: true }, { transaction }),
          Token.destroy({ where: { token } }),
        ]);
      });
    })
    .then(([user, _]) => {
      return res.status(200).json({
        success: true,
        message: `User '${user.dataValues.email}' has been activated`,
      });
    })
    .catch(error => {
      return res.status(400).json({
        success: false,
        message: errorToText(error),
      });
    });
});

module.exports = router;
