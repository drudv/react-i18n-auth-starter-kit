const Sequelize = require('sequelize');
const {DEFAULT_MODEL_OPTIONS} = require('../common');

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

