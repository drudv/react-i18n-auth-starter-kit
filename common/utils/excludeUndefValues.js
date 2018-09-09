/** module.exports - bacause also used in webpack.config.js */
module.exports = function excludeUndefValues(object) {
  if (Array.isArray(object)) {
    return object.filter(value => typeof value !== 'undefined');
  } else {
    // object
    const result = {};
    Object.keys(object).forEach(key => {
      if (typeof object[key] !== 'undefined') {
        result[key] = object[key];
      }
    });
    return result;
  }
};
