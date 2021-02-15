const express = require('express');
const asyncHandler = require('../../middlewares/async');
const auth = require('../../middlewares/auth');
const Table = require('../../models/Table');
const router = express.Router();



//route POST   api/tables
//description  create table
//access       private
router.post('/', auth, asyncHandler( async(req, res, next) => {
    
    let user;

    if (req.user) {
        user = await User.findById(req.user.id).select('-password')
    } else {
        user = await Guest.findOne({ ip: req.headers['x-forwarded-for'] })
    }

    const table = new Table({
        users: [user],
        name: user.name
    })

    await table.save()
    console.log(table)
    res.json(table)

}));



//route POST   api/tables/:id
//description  join to the table
//access       private
router.post('/:id', auth, asyncHandler( async(req, res, next) => {

    let user;

    if (req.user) {
        user = await User.findById(req.user.id).select('-password')
    } else {
        user = await Guest.findOne({ ip: req.headers['x-forwarded-for'] })
    }

    const table = await Table.findById(req.params.id)
    
    table.users = [ ...table.users, user ]


    await table.save()

    
    res.json(table)

}));

//route PUT    api/tables/:id
//description  leave from the table
//access       private
router.put('/:id', auth, asyncHandler( async(req, res, next) => {

    const { leave } = req.body;

    let user;

    if (req.user) {
        user = await User.findById(req.user.id).select('-password')
    } else {
        user = await Guest.findOne({ ip: req.headers['x-forwarded-for'] })
    }

    const table = await Table.findById(req.params.id);
    
    if ( leave ) {
        table.users = await table.users.filter(element => element._id.toString() !== user._id.toString());
    }
    

    if (table.users.length === 0) {

        await table.remove()
    }

    await table.save()

    res.json(table)

}));


//route GET    api/tables
//description  get tables list
//access       private
router.get('/', asyncHandler( async(req, res, next) => {

    const tables = await Table.find().sort({ date: -1 });

    res.json(tables)

}));

//route GET    api/tables/:id
//description  get table by id
//access       private
router.get('/:id', asyncHandler( async(req, res, next) => {

    const table = await Table.findById(req.params.id)

    res.json(table)

}));


//route DELETE api/tables/:id
//description  delete table
//access       private
router.delete('/:id', asyncHandler( async(req, res, next) => {


    const table = await Table.findById(req.params.id)
    
    await table.remove()

    res.json(table)

}));


module.exports = router;