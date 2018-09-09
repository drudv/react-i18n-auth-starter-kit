const { INTEGER, BOOLEAN, STRING } = require('sequelize');

module.exports = function(sequelize) {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      active: {
        type: BOOLEAN,
        allowNull: false,
      },
      email: {
        type: STRING,
        allowNull: false,
        unique: 'uniqueEmail',
      },
      password: {
        type: STRING,
      },
      name: {
        type: STRING,
        allowNull: false,
      },
      lang: {
        type: STRING,
        allowNull: false,
        defaultValue: 'en',
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'user',
      underscored: true,
    }
  );

  const UserActivationToken = sequelize.define(
    'UserActivationToken',
    {
      id: {
        type: INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: STRING,
        allowNull: false,
        unique: 'uniqueActivationToken',
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'user_activation_token',
      underscored: true,
    }
  );
  UserActivationToken.belongsTo(User);

  User.hasMany(UserActivationToken);

  return {
    User,
    UserActivationToken,
  };
};
