const express = require('express');

const router = express.Router();
const asyncHandler = require('../../middlewares/async');
const User = require('../../models/User');
const gravatar = require('gravatar');
const sign_in = require('../../utils/sign_in');
const ErrorResponse = require('../../utils/ErrorResponse');

const Usercontroller = require('../../controllers/UserController');

const userController = Usercontroller();

//route POST   api/users
//description  register user
//access       public
router.post('/', userController.register);

//route POST   api/users
//description  signup guest / login guest
//access       public
router.post('/guests', userController.guestSignIn);


module.exports = router;