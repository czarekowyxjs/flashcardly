'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Words', {
      wid: {
        type: Sequelize.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true
      },
      fid: {
        type: Sequelize.BIGINT
      },
      firstColumnValue: {
        type: Sequelize.STRING
      },
      secondColumnValue: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.STRING(99)
      }
    }, {
      charset: 'utf8mb4'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Words');
  }
};