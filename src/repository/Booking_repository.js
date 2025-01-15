const { Booking } = require('../models/index')
const {ValidationError , AppError} = require('../utils/Errors/index')
const { StatusCodes } = require('http-status-codes')
  
class BookingRepository {

    async create(data){
        try {
            const booking = await Booking.create(data)
            return booking
        } catch (error) {
            if(error.name == 'SequelizeValidationError')
            {
                throw new ValidationError(error)
                
            }
            throw new AppError(
                'RepositoryError',
                'can not create Booking',
                'There was some issue while Booking , please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR

            )
        }
    }

    async updateBooking(bookingId, data) {
        try {
            // await Booking.update(data, {
            //     where: {
            //         id: bookingId
            //     }
            // })
            // return true
            const booking = await Booking.findByPk(bookingId);
            await booking.update(data)
            await booking.save();
            return booking

        } catch (error) {
            throw new AppError(
                'RepositoryError',
                'can not update Booking',
                'There was some issue while Updating the Booking , please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR

            )
        }
    }
}

module.exports = BookingRepository