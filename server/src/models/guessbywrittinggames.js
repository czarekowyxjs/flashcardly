'use strict';
module.exports = (sequelize, DataTypes) => {
  const GuessByWrittingGames = sequelize.define('GuessByWrittingGames', {
    gbwid: {
      type: DataTypes.INTEGER.UNSIGNED,
      unique: true,
      autoIncrement: true,
      primaryKey: true
    },
    fid: {
      type: DataTypes.INTEGER.UNSIGNED
    },
    uid: {
      type: DataTypes.INTEGER.UNSIGNED
    },
    result: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    wordsAmount: {
      type: DataTypes.INTEGER
    },
    finished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.STRING(255),
      defaultValue: Math.floor(new Date().getTime()/1000)
    }
  }, {
    tableName: "GuessByWrittingGames",
    timestamps: false
  });
  GuessByWrittingGames.associate = function(models) {
    GuessByWrittingGames.belongsTo(models.Flashcard, { foreignKey: 'fid' });
    GuessByWrittingGames.belongsTo(models.User, { foreignKey: 'uid' });
  };
  return GuessByWrittingGames;
};