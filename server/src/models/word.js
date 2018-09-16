'use strict';
module.exports = (sequelize, DataTypes) => {
  const Word = sequelize.define('Word', {
  	wid: {
  		type: DataTypes.INTEGER.UNSIGNED,
  		unique: true,
  		autoIncrement: true,
  		primaryKey: true
  	},
  	fid: {
  		type: DataTypes.INTEGER.UNSIGNED
  	},
  	firstColumnValue: {
  		type: DataTypes.STRING
  	},
  	secondColumnValue: {
  		type: DataTypes.STRING
  	},
    learned: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
  	createdAt: {
  		type: DataTypes.STRING(99)
  	}
  }, {
  	hooks: {
  		beforeCreate: function(word) {
  			word.createdAt = Math.floor(new Date().getTime()/1000);
  			return word;
  		}
  	},
  	tableName: 'Words',
  	timestamps: false
  });
  Word.associate = function(models) {
  	Word.belongsTo(models.Flashcard, { foreignKey: 'fid' });
  };
  return Word;
};