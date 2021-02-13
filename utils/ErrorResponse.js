class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message)
        this.message = statusCode
    }
}
module.exports = ErrorResponse;