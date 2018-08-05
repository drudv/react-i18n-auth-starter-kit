const sequelizeFixtures = require('sequelize-fixtures');
const db = require('../server/db');

db.sequelize.sync().then(() => {
  sequelizeFixtures.loadFile(
    __dirname + '/../server/db/fixtures/*.json',
    db.models
  )
    .then(() => {
      console.log('DB successfully installed');
      process.exit();
    });
});
