const express = require('express');
const asyncHandler = require('../../middlewares/async');
const User = require('../../models/User');
const ErrorResponse = require('../../utils/ErrorResponse');
const router = express.Router();
const bcrypt = require('bcryptjs');
const sign_in = require('../../utils/sign_in');
const auth = require('../../middlewares/auth');
const Guest = require('../../models/Guest');

//route GET    api/auth
//description  user route
//access       private
router.get('/', auth, asyncHandler( async(req, res, next) => {
    let user; 

    if (req.user) {
        user = await User.findById(req.user.id).select('-password')
    } else {
        user = await Guest.findOne({ ip: req.headers['x-forwarded-for'] })
        console.log(user, 'guest')
    }
    
    res.json(user)
    
}))

//route POST   api/auth
//description  login user
//access       public
router.post('/', asyncHandler( async(req, res, next) => {


    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse('Invalid credentials', 422));
    }

    const user = await User.findOne({ email });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return next( new ErrorResponse('Invalid credentials', 422));
    }

    return sign_in(user, 200, res)


}));

//route POST   api/auth
//description  login user
//access       public
router.post('/', asyncHandler( async(req, res, next) => {


    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse('Invalid credentials', 422));
    }

    const user = await User.findOne({ email });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return next( new ErrorResponse('Invalid credentials', 422));
    }

    return sign_in(user, 200, res)


}));

module.exports = router;