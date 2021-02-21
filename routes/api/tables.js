const express = require('express');
const asyncHandler = require('../../middlewares/async');
const auth = require('../../middlewares/auth');
const Table = require('../../models/Table');
const User = require('../../models/User');
const ErrorResponse = require('../../utils/ErrorResponse');
const router = express.Router();



//route POST   api/tables
//description  create table
//access       private
router.post('/', auth, asyncHandler( async(req, res, next) => {
    
    const { name } = req.body;

    let user;

    if (!req.user && !name) {
        return next(new ErrorResponse('Please enter room name', 422))
    }

    if (req.user) {
        user = await User.findById(req.user.id).select('-password')

    }

    if (!user) {
        return next(new ErrorResponse('User not authorized', 401))
    }
    let nameUpperCase;
    if (name) {
        nameUpperCase = name.charAt(0).toUpperCase() + name.slice(1);

        const isMatch = await User.findOne({ name: nameUpperCase })
        if (isMatch) {
            return next(new ErrorResponse('User not authorized', 401))
        }

    }
    
    const table = new Table({
        users: user ? [user] : [],
        name: nameUpperCase || user.name
    })

    await table.save()
    
    res.json(table)

}));



//route POST   api/tables/:id
//description  join to the table
//access       private
router.post('/:id', auth, asyncHandler( async(req, res, next) => {

    let user;

    const table = await Table.findById(req.params.id).populate({ path: 'users = user', model: 'User'}).populate({ path: 'games = game', model: 'Game'})
    
    if (!table) {
        return next(new ErrorResponse('Table not found', 404))
    }

    if (req.user) {
        user = await User.findById(req.user.id).select('-password')

        const isMatch = table.users.filter(element => element._id.toString() === req.user.id)
        if (isMatch[0]) {
            
            return res.json(table)
        }

    }
    if (!user) {
        return next(new ErrorResponse('User not found', 404))
    }

    

    if (user) {
        table.users = [ ...table.users, user ]
    }

    await table.save()

    
    res.json(table)

}));

//route PUT    api/tables/:id
//description  leave from the table
//access       private
router.put('/:id', auth, asyncHandler( async(req, res, next) => {

    const { leave, player } = req.body;

    const user = await User.findById(req.user.id).select('-password')

    const table = await Table.findById(req.params.id);
    
    
    if ( player ) {
        
        table.players = await table.players.filter(element => element.toString() !== user._id)
        table.players[player - 1] = req.user.id

        await table.save()

        return res.json(table.players)
        
    }

    if ( leave ) {
        table.users = await table.users.filter(element => element._id.toString() !== user._id.toString());
        table.players = await table.players.filter(element => element._id.toString() !== user._id.toString());
        

    }
    

    if (table.users.length === 0) {

        await table.remove()

        return res.json(table)

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

    let table = await Table.findById(req.params.id).populate({ path: 'users = user', model: 'User' }).populate({ path: 'games = game', model: 'Game' })
    
    
    if (!table) {
        return next(new ErrorResponse('Table does not exist', 404))
    }

    res.json(table)

}));


//route DELETE api/tables/:id
//description  delete table
//access       private
router.delete('/:id', auth, asyncHandler( async(req, res, next) => {


    const table = await Table.findById(req.params.id).populate({ path: 'users = user', model: 'User' })

    
    const isMatch = await table.users.filter(element => element._id.toString() === req.user.id);
    if (!isMatch[0]) {
        return next(new ErrorResponse('User not authorised', 401))
    }
    
    await table.remove()

    res.json(table)

}));


module.exports = router;