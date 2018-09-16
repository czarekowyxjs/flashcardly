'use strict';
module.exports = (sequelize, DataTypes) => {
  const Flashcard = sequelize.define('Flashcard', {
    fid: {
    	type: DataTypes.INTEGER.UNSIGNED,
    	unique: true,
    	autoIncrement: true,
    	primaryKey: true
    },
    author: {
    	type: DataTypes.INTEGER.UNSIGNED
    },
    title: {
    	type: DataTypes.STRING(28),
    	required: true
    },
    firstColumnName: {
    	type: DataTypes.STRING(20),
    	required: true
    },
    secondColumnName: {
    	type: DataTypes.STRING(20),
    	required: true
    },
    createdAt: {
    	type: DataTypes.STRING(99)
    }
  }, {
  	hooks: {
  		beforeCreate: function(flashcard) {
  			flashcard.createdAt = Math.floor(new Date().getTime()/1000);
  			return flashcard;
  		}
  	},
  	tableName: 'Flashcards',
  	timestamps: false
  });
  Flashcard.associate = function(models) {
    Flashcard.belongsTo(models.User, { foreignKey: 'author' });
    Flashcard.hasMany(models.Word, { foreignKey: 'fid' });
  };
  return Flashcard;
};