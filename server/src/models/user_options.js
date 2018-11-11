'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_options = sequelize.define('User_options', {
      uid: {
        type: DataTypes.INTEGER.UNSIGNED,
        unique: true
      },
      termsAccept: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      flashcardIntro: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      emailConfirm: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      setAvatar: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      emailVisibility: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      loginByUsername: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
  }, {
  	timestamps: false,
  	tableName: "User_options"
  });

  User_options.removeAttribute("id");

  User_options.associate = function(models) {
    User_options.belongsTo(models.User, { foreignKey: "uid" });
  };
  return User_options;
};