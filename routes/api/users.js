const express = require('express');

const router = express.Router();
const asyncHandler = require('../../middlewares/async');
const User = require('../../models/User');
const gravatar = require('gravatar');
const sign_in = require('../../utils/sign_in');



//route POST   api/users
//description  register user
//access       public
router.post('/', asyncHandler( async(req, res, next) => {

    const { email, name, password, passwordConfirm } = req.body;

    if (!email || !name || !password || !passwordConfirm) {
        return next(new ErrorResponse('Invalid credentials', 422))
    }

    if (password !== passwordConfirm) {
        return next(new ErrorResponse('Please enter equal passwords', 422))
    }

    let user = await User.findOne({ user: email });

    if (user) {
        return next(new ErrorResponse('This account already exists', 422))
    }

    const gravatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

    const nameUpperCase = name.charAt(0).toUpperCase() + name.slice(1);

    user = new User({
        name: nameUpperCase,
        email,
        password,
        avatar: gravatar
    });


    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt)


    await user.save()

    return sign_in(user, 200, res)

}))