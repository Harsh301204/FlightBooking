const { BookingRepository } = require('../repository/index')
const axios = require('axios')
const { FLIGHT_PATH } = require('../config/ServerConfig.js')

const { ServerError } = require('../utils/Errors/index')

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository
    }

    async CreateBooking(data) {
        try {

            const FlightId = data.FlightId
            const getFlightURL = `${FLIGHT_PATH}/api/v1/flights/${FlightId}`
            const response = await axios.get(getFlightURL)
            console.log(response.data.data)
            const flightdata = response.data.data
            let flightPrice = flightdata.price
            if (data.NumberOfSeats > flightdata.totalSeats) {
                throw new ServerError('Something went wrong in Booking Process',
                    'Insufficient seats in the Flight'
                )
            }

            const TotalCost = data.NumberOfSeats * flightPrice
            // console.log(TotalCost)
            const BookingPayload = { ...data, TotalCost }
            // // console.log(BookingPayload)
            const booking = await this.bookingRepository.create(BookingPayload)

            const updateFlightURL = `${FLIGHT_PATH}/api/v1/flights/${booking.FlightId}`
            await axios.patch(updateFlightURL, { totalSeats: flightdata.totalSeats - booking.NumberOfSeats })

            const FinalBooking = await this.bookingRepository.updateBooking(booking.id, { Status: 'Booked' })

            // return response.data.data
            // // return booking;
            return FinalBooking


        } catch (error) {
            if (error.name == 'RepositoryError' || error.name == 'ValidationError') {
                throw error
            }
            throw new ServerError()
        }

    }

    async getBooking(id) {
        try {
            const data = await this.bookingRepository.FindBooking(id)
            return data
        } catch (error) {
            console.log("error in service " , error)
            if (error.name == 'RepositoryError' || error.name == 'ValidationError') {
                throw error
            }
            throw new ServerError()


        }


    }

    async CancelBooking(id)
    {
        try {
            const data = await this.bookingRepository.FindBooking(id)
            data.Status = 'Cancelled';
            await data.save();
            return data
        } catch (error) {
            console.log("error in service " , error)
            if (error.name == 'RepositoryError' || error.name == 'ValidationError') {
                throw error
            }
            throw new ServerError()
        }
    }
}

module.exports = BookingService