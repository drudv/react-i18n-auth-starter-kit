const bcrypt = require('bcrypt');

module.exports = function compareHashAndPassword(hash, password) {
  return new Promise((resolve, reject) => {
    if (!hash) {
      reject(false);
      return;
    }
    bcrypt.compare(password, hash, (error, result) => {
      if (result) {
        resolve(true);
        return;
      }
      reject(false);
    });
  });
};
