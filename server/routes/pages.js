const fs = require('fs');
const express = require('express');
const {template} = require('lodash');
const router = new express.Router();
const evalPageTemplate = template(fs.readFileSync(__dirname + '/../templates/page.tpl'));

const pageHandler = (request, result) => {
  const content = evalPageTemplate({
    initialAppData: JSON.stringify({
      page: request.originalUrl,
    }),
  });
  result.send(content);
};

router.get('/', pageHandler);
router.get('/dashboard', pageHandler);
router.get('/login', pageHandler);
router.get('/logout', pageHandler);
router.get('/signup', pageHandler);

module.exports = router;
