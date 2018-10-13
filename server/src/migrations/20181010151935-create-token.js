'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tokens', {
      tid: {
        type: Sequelize.INTEGER.UNSIGNED,
        unique: true,
        primaryKey: true,
        autoIncrement: true
      },
      uid: {
        type: Sequelize.INTEGER.UNSIGNED,
        required: true
      },
      token: {
        type: Sequelize.STRING(999)
      },
      createdAt: {
        type: Sequelize.STRING(255),
        defaultValue: Math.floor(new Date().getTime()/1000)
      },
      updatedAt: {
        type: Sequelize.STRING(255),
        defaultValue: Math.floor(new Date().getTime()/1000)
      }
    }, {
      charset: 'utf8',
      collate: 'utf8_bin'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tokens');
  }
};