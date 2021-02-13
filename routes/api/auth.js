const express = require('express');
const asyncHandler = require('../../middlewares/async');
const router = express.Router();


//route POST   api/auth
//description  login user
//access       public
router.post('/', asyncHandler( async(req, res, next) => {


    const { email, password } = req.body;





}))