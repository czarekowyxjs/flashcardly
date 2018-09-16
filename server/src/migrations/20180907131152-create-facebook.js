'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Facebooks', {
      fbid: {
        type: Sequelize.INTEGER.UNSIGNED,
        unique: true,
        autoIncrement: true,
        primaryKey: true
      },
      uid: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      accessToken: {
        type: Sequelize.STRING(999),
        required: true
      },
      signedRequest: {
        type: Sequelize.STRING(1500),
        required: true
      },
      userID: {
        type: Sequelize.BIGINT.UNSIGNED,
        unique: true
      },
      pictureURL: {
        type: Sequelize.STRING(999)
      },
      firstName: {
        type: Sequelize.STRING(255)
      },
      lastName: {
        type: Sequelize.STRING(255)
      }
    }, {
      charset: 'utf8mb4'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Facebooks');
  }
};