const ErrorResponse = require("../utils/ErrorResponse")

const errorHandler = (err, req, res, next) => {

    let error = { ...err }

    error.message = err.message
    console.log(error)
    // database duplicate
    if (error.code === 11000) {
        const location = Object.keys(err.keyValue)[0]
        error = new ErrorResponse(`This ${location} already exists.`, 400)
        console.log(error)
    }

    if (err.name == "ValidationError") {
        console.log(err.name)
        const location = Object.values(err.errors).map(value => value.path).join(', ')
        
        error = new ErrorResponse(`Please enter ${location}.`, 400)
    }

    // case of unhandled error
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server error.'
    })


}
module.exports = errorHandler;