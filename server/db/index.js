const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const config = require('../../config');

const db = {
  sequelize: new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
    operatorsAliases: false, // @see https://github.com/sequelize/sequelize/issues/8417
    host: config.dbHost || 'localhost',
    port: config.dbPort || 3306,
    dialect: 'mysql',
  }),
  models: {},
};
db.models = require('./models.js')(db.sequelize);

Object.keys(db.models)
  .forEach((modelName) => {
    if ('associate' in db.models[modelName]) {
      db.models[modelName].associate(db.models);
    }
  });

module.exports = db;
