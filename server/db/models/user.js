const {DEFAULT_MODEL_OPTIONS} = require('../common');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'uniqueEmail',
      },
      password: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      ...DEFAULT_MODEL_OPTIONS,
      tableName: 'user',
    },
  );
  return User;
};
