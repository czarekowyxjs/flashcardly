'use strict';
module.exports = (sequelize, DataTypes) => {
  const Facebook = sequelize.define('Facebook', {
    fbid: {
    	type: DataTypes.INTEGER.UNSIGNED,
    	unique: true,
    	autoIncrement: true,
    	primaryKey: true
    },
    uid: {
    	type: DataTypes.INTEGER.UNSIGNED
    },
    accessToken: {
    	type: DataTypes.STRING(999),
    	required: true
    },
    signedRequest: {
    	type: DataTypes.STRING(1500),
    	required: true
    },
    userID: {
    	type: DataTypes.BIGINT.UNSIGNED,
    	unique: true
    },
    pictureURL: {
    	type: DataTypes.STRING(999)
    },
    firstName: {
    	type: DataTypes.STRING(255)
    },
    lastName: {
    	type: DataTypes.STRING(255)
    }
  }, {
  	tableName: 'Facebooks',
  	timestamps: false
  });
  Facebook.associate = function(models) {
    Facebook.belongsTo(models.User, { foreignKey: 'uid' });
  };
  return Facebook;
};