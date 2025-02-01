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

        const channel = await createChannel()
        const payload = {
            data: {
                subject: "This is a Notification from Queue",
                content: "Some Queue will subscribe this",
                recepientEmail: "ghost04704@gmail.com",
                notificationTime: "2025-01-20T12:30:00.000"

            },
            service: 'CREATE_TICKET'
        }
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload))
        return res.status(201).json({
            message: "Succesfully executed the Event"
        })

    }

    async create(req, res) {
        try {

            const result = await bookingService.CreateBooking(req.body)
            console.log("kya tha yha pr")
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


    async Get(req, res) {
        try {
            console.log("Start")
            const result = await bookingService.getBooking(req.params.id)
            console.log(result)
            return res.status(StatusCodes.ACCEPTED).json({
                data: result,
                err: {},
                success: true,
                message: "Booking Details fetcehd Successfully and here i am"
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

    async cancel(req , res){
        try {
            
            const result = await bookingService.CancelBooking(req.params.id)
            console.log(result)
            return res.status(StatusCodes.ACCEPTED).json({
                data: result,
                err: {},
                success: true,
                message: "Booking Details fetcehd Successfully and here i am"
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

module.exports = BookingController
