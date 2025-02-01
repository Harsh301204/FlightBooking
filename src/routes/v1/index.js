const express = require('express')

const {  BookingController } = require('../../controllers/index')
const booking = require('../../models/booking')

// const { createChannel } = require('../../utils/messageQueue')
// const channel = await createChannel()
const bookingController = new BookingController()

const router = express.Router()

router.post('/bookings' ,  bookingController.create)
router.post('/publish' , bookingController.sendMessageToQueue)

router.get('/booking/:id' , bookingController.Get)

router.get('/booking/cancel/:id' , bookingController.cancel)

module.exports = router