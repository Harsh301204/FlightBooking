'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    FlightId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values : ['InProcess' , 'Cancelled' , 'Booked'],
      defaultValue : 'InProcess'
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};