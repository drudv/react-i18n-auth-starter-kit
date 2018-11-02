const Sequelize = require('sequelize');
const {DEFAULT_MODEL_OPTIONS} = require('../common');
const {TOKEN_TYPE_ACTIVATE_USER} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define(
    'Token',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'uniqueToken',
      },
      tokenType: {
        type: DataTypes.ENUM(TOKEN_TYPE_ACTIVATE_USER)
      }
    },
    {
      ...DEFAULT_MODEL_OPTIONS,
      tableName: 'token',
    }
  );
  Token.associate = ({User, Token}) => {
    User.hasMany(Token, {foreignKey: 'userId', sourceKey: 'id'});
    Token.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});
  };
  return Token;
};

