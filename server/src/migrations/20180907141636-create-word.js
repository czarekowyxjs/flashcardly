'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Words', {
      wid: {
        type: Sequelize.INTEGER.UNSIGNED,
        unique: true,
        autoIncrement: true,
        primaryKey: true
      },
      fid: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      firstColumnValue: {
        type: Sequelize.STRING
      },
      secondColumnValue: {
        type: Sequelize.STRING
      },
      learned: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
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
    return queryInterface.dropTable('Words');
  }
};