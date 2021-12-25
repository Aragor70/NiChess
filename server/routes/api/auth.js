const express = require('express');
const asyncHandler = require('../../middlewares/async');
const User = require('../../models/User');
const ErrorResponse = require('../../utils/ErrorResponse');
const router = express.Router();
const auth = require('../../middlewares/auth');
const AuthController = require('../../controllers/AuthController');

const authController = new AuthController;

//route GET    api/auth
//description  user route
//access       private
router.get('/', auth, authController.getUser);

//route POST   api/auth
//description  login user
//access       public
router.post('/', authController.login);


module.exports = router;