'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Flashcards', {
      fid: {
        type: Sequelize.INTEGER.UNSIGNED,
        unique: true,
        autoIncrement: true,
        primaryKey: true
      },
      author: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      title: {
        type: Sequelize.STRING(28),
        required: true
      },
      firstColumnName: {
        type: Sequelize.STRING(20),
        required: true
      },
      secondColumnName: {
        type: Sequelize.STRING(20),
        required: true
      },
      createdAt: {
        type: Sequelize.STRING(99)
      }
    }, {
      charset: 'utf8mb4'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Flashcards');
  }
};