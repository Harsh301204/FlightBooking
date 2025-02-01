const { StatusCodes } = require('http-status-codes')

class ServerError extends Error {
    constructor (
        name = "serviceError",
        message = "something went wrong",
        explaination = "Service layer error",
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
        
    )
    {
        super()
        this.name = name,
        this.message = message,
        this.explaination = explaination,
        this.statusCode = statusCode
    }
}

module.exports = ServerError 