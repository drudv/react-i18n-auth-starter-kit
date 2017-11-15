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

const modelsDir = path.join(__dirname, 'models');

fs
  .readdirSync(modelsDir)
  .filter(file => !['.', '..', 'index.js'].includes(file))
  .forEach((file) => {
    const model = db.sequelize.import(path.join(modelsDir, file));
    db.models[model.name] = model;
  });

Object.keys(db.models)
  .forEach((modelName) => {
    if ('associate' in db.models[modelName]) {
      db.models[modelName].associate(db.models);
    }
  });

module.exports = db;
