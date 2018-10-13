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
      username: {
        type: Sequelize.STRING(99)
      },
      email: {
        type: Sequelize.STRING(255),
        unique: true
      },
      sex: {
        type: Sequelize.STRING(1),
        defaultValue: 'u'
      },
      password: {
        type: Sequelize.STRING(999),
        required: true
      },
      emailHash: {
        type: Sequelize.STRING(999)
      },
      avatarUrl: {
        type: Sequelize.STRING(999),
        defaultValue: ""
      },
      createdAt: {
        type: Sequelize.STRING(99)
      }
    }, {
      charset: 'utf8',
      collate: 'utf8_bin'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};