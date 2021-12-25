const express = require('express');

const router = express.Router();

const UserController = require('../../controllers/UserController');

const userController = new UserController;

//route POST   api/users
//description  register user
//access       public
router.post('/', userController.register);

//route POST   api/users
//description  signup guest / login guest
//access       public
router.post('/guests', userController.guestSignIn);


module.exports = router;