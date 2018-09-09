const fs = require('fs');
const { get } = require('lodash');
const path = require('path');
const locales = {};

const DEFAULT_LANG = 'en';

fs.readdirSync(path.join(__dirname, '../../locales')).forEach(fileName => {
  if (!['.', '..'].includes(fileName)) {
    const translationsJSON = fs.readFileSync(
      path.join(__dirname, `../../locales/${fileName}/translations.json`)
    );
    locales[fileName] = JSON.parse(translationsJSON);
  }
});

module.exports = function translate(lang, resourceId) {
  return get(locales, [lang, resourceId], '');
};
