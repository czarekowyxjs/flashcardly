'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User_options', {
      uid: {
        type: Sequelize.INTEGER.UNSIGNED,
        unique: true
      },
      flashcardIntro: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      emailConfirm: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      emailVisibility: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      loginByUsername: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    }, {
      charset: 'utf8',
      collate: 'utf8_bin'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User_options');
  }
};