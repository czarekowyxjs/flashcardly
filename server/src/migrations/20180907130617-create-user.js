'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      uid: {
        type: Sequelize.INTEGER.UNSIGNED,
        unique: true,
        autoIncrement: true,
        primaryKey: true
      },
      createdAt: {
        type: Sequelize.STRING(255)
      },
      displayName: {
        type: Sequelize.STRING(999)
      }
    }, {
      charset: 'utf8mb4'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};