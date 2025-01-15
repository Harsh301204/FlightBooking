const { StatusCodes } = require('http-status-codes')
const { BookingService } = require('../services/index')
const {ServerError} = require('../utils/Errors/index')


const bookingService = new BookingService()


const create = async (req,res) => {
    try {
        
        const result = await bookingService.CreateBooking(req.body)
        return res.status(StatusCodes.CREATED).json({
            data : result,
            err : {},
            success : true,
            message : "Flight Booked Successfully and here i am"
        })
    } catch (error) {
        return res.status(error.StatusCode).json({
            message : error.message,
            success : false,
            data : {},
            err : error.explaination
        })
    }
}

module.exports = {
    create
}