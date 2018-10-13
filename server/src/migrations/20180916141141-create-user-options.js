'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User_options', {
      uid: {
        type: Sequelize.INTEGER.UNSIGNED,
        unique: true
      },
      termsAccept: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      flashcardIntro: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      emailConfirm: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      setAvatar: {
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