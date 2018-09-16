'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User_options', {
      uid: {
        type: Sequelize.INTEGER.UNSIGNED,
        unique: true
      },
      termsDialog: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    }, {
      charset: 'utf8mb4'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User_options');
  }
};