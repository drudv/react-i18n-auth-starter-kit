const sequelize = require('sequelize');
const InternalServerError = require('../../errors/InternalServerError');

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
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
      },
      lang: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'en'
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'user',
      underscored: true,
    },
  );

  return User;
};
