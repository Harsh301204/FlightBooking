'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     * 
     */
    await queryInterface.addColumn(
      'bookings',
      'NumberOfSeats',
      {
        type : Sequelize.INTEGER,
        allowNull : false,
        defaultValue : 1
      }
    )

    await queryInterface.addColumn(
      'bookings',
      'TotalCost',
      {
        type : Sequelize.INTEGER,
        allowNull : false,
        defaultValue : 0
      }
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('bookings','NumberOfSeats')
    await queryInterface.removeColumn('bookings','TotalCost')
  }
};
