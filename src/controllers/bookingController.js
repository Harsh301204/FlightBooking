const { StatusCodes } = require('http-status-codes')
const { BookingService } = require('../services/index')
const { ServerError } = require('../utils/Errors/index')

const { createChannel, publishMessage } = require('../utils/messageQueue')
const { REMINDER_BINDING_KEY } = require('../config/ServerConfig')


const bookingService = new BookingService()

class BookingController {

    constructor() {
    }


    async sendMessageToQueue(req, res) {
        try {
            const channel = await createChannel()
            const data = {message : "Success"}
            publishMessage(channel , REMINDER_BINDING_KEY ,JSON.stringify(data))
            return res.status(201).json({
                message : "Succesfully executed the Event"
            })
        } catch (error) {

        }
    }

    async create(req, res) { 
        try {

            const result = await bookingService.CreateBooking(req.body)
            return res.status(StatusCodes.CREATED).json({
                data: result,
                err: {},
                success: true,
                message: "Flight Booked Successfully and here i am"
            })
        } catch (error) {
            return res.status(error.StatusCode).json({
                message: error.message,
                success: false,
                data: {},
                err: error.explaination
            })
        }
    }
}

// const create = async (req,res) => {
//     try {

//         const result = await bookingService.CreateBooking(req.body)
//         return res.status(StatusCodes.CREATED).json({
//             data : result,
//             err : {},
//             success : true,
//             message : "Flight Booked Successfully and here i am"
//         })
//     } catch (error) {
//         return res.status(error.StatusCode).json({
//             message : error.message,
//             success : false,
//             data : {},
//             err : error.explaination
//         })
//     }
// }

module.exports = BookingController
