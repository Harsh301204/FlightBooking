const { StatusCodes } = require('http-status-codes')

class ValidationError extends Error {

    constructor(error){
        super()
        let explaination = []
        error.errors.array.forEach(element => {
            explaination.push(element.message)
        });
        this.name = "ValidationError",
        this.message = "Not Able to Validate the Data sent in Request",
        this.explaination = explaination,
        this.statusCode = StatusCodes.BAD_REQUEST
    }

}

module.exports = ValidationError