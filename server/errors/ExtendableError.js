const ExtendableError = function ExtendableError(message) {
  this.message = message;
  this.name = this.constructor.name;

  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error(message)).stack;
  }

  this.stack = (new Error(message)).stack;
}
ExtendableError.prototype = Object.create(Error.prototype);
ExtendableError.prototype.constructor = ExtendableError;

module.exports = ExtendableError;
