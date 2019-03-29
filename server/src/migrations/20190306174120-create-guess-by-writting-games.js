'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GuessByWrittingGames', {
      gbwid: {
        type: Sequelize.INTEGER.UNSIGNED,
        unique: true,
        autoIncrement: true,
        primaryKey: true
      },
      fid: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      uid: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      result: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      wordsAmount: {
        type: Sequelize.INTEGER
      },
      finished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.STRING(255),
        defaultValue: Math.floor(new Date().getTime()/1000)
      }
    }, {
      charset: 'utf8',
      collate: 'utf8_bin'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('GuessByWrittingGames');
  }
};