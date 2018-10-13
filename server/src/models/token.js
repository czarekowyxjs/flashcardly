'use strict';
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    tid: {
    	type: DataTypes.INTEGER.UNSIGNED,
    	unique: true,
    	primaryKey: true,
    	autoIncrement: true
    },
    uid: {
    	type: DataTypes.INTEGER.UNSIGNED,
    	required: true
    },
    token: {
    	type: DataTypes.STRING(999)
    },
    createdAt: {
    	type: DataTypes.STRING(255),
    	defaultValue: Math.floor(new Date().getTime()/1000)
    },
    updatedAt: {
    	type: DataTypes.STRING(255),
    	defaultValue: Math.floor(new Date().getTime()/1000)
    }
  }, {
  	tableName: "Tokens",
  	timestamps: false
  });
  Token.associate = function(models) {
    Token.belongsTo( models.User, { foreignKey: 'uid' });
  };
  // classMethods
  Token.generateToken = function() {
    var hash = "";
    const hashRounds = 30;

    for(let i = 0;i < hashRounds;++i) {
      hash += Math.random().toString(36).substring(2);
    }
    hash += (new Date().getTime()).toString(36);
    return hash;
  }
  return Token;
};