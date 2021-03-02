const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../models/User");




const auth = async(req, res, next) => {


    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
        return next(new ErrorResponse('User not authorised', 401))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_Secret)
        
        req.user = await User.findById(decoded.id)
        next()

    } catch (err) {
        return next(new ErrorResponse('User not authorised', 401))
    }

}
module.exports = auth;