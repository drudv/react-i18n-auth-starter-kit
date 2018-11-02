const DEFAULT_TOKEN_LENGTH = 64;

module.exports = function generateToken(tokenLength) {
  return [...Array(tokenLength || DEFAULT_TOKEN_LENGTH)]
    .map(_ => ((Math.random() * 36) | 0).toString(36))
    .join('');
};

Object.assign(module.exports, {
  DEFAULT_TOKEN_LENGTH,
});
