'use strict';
const uuid = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
  	uid: {
  		type: DataTypes.BIGINT,
  		unique: true,
  		autoIncrement: true,
  		primaryKey: true
  	},
  	createdAt: {
  		type: DataTypes.STRING(99)
  	},
    displayName: {
    	type: DataTypes.STRING(999)
    }
  }, {
  	hooks: {
  		beforeCreate: function(user) {
  			user.createdAt = Math.floor(new Date().getTime()/1000);
        user.displayName = uuid();
  			return user;
  		}
  	},
  	tableName: 'Users',
  	timestamps: false
  });
  User.associate = function(models) {
    User.hasOne(models.Facebook, { foreignKey: 'uid' });
    User.hasMany(models.Flashcard, { foreignKey: 'author' });
  };
  return User;
};