const bcrypt = require('bcrypt');
const InternalServerError = require('../errors/InternalServerError');

module.exports = function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt((saltError, salt) => {
      if (saltError) {
        reject(
          new InternalServerError(`Salt generation error: ${saltError}`)
        );
      }

      bcrypt.hash(password, salt, (hashError, hash) => {
        if (hashError) {
          reject(
            new InternalServerError(
              `Password hashing error: ${hashError}`
            )
          );
        }
        resolve(hash);
      });
    });
  });
};

