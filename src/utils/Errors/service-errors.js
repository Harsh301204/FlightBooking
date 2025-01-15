const { StatusCodes } = require('http-status-codes')

class ServerError extends Error {
    constructor (
        name = "serviceerror",
        message = "something went wrong",
        explaination = "Service layer error",
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
        
    )
    {
        super()
        this.name = "ServiceError",
        this.message = message,
        this.explaination = explaination,
        this.statusCode = statusCode
    }
}

module.exports = ServerError