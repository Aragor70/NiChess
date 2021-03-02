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


    const user = await User.findById(req.user.id).select('-password')

    if (!user) {
        return next(new ErrorResponse('User not authorized', 401))
    }

    if (user.role === "Guest" && !name) {
        return next(new ErrorResponse('Please enter name', 422))
    }

    
    let nameUpperCase;
    if (name) {
        nameUpperCase = name.charAt(0).toUpperCase() + name.slice(1);

        const isMatch = await User.findOne({ name: nameUpperCase })
        if (isMatch && isMatch._id !== user._id) {
            return next(new ErrorResponse('User not authorized', 401))
        }

    }
    
    const table = new Table({
        users: user ? [user] : [],
        name: nameUpperCase || user.name,
        players: {
            white: null,
            black: null
        }
    })

    await table.save()
    
    res.json(table)

}));



//route POST   api/tables/:id
//description  join to the table
//access       private
router.post('/:id', auth, asyncHandler( async(req, res, next) => {


    const table = await Table.findById(req.params.id).populate({ path: 'users = user', model: 'User'}).populate({ path: 'games = game', model: 'Game'}).populate({ path: 'players.white = user', model: 'User' }).populate({ path: 'players.black = user', model: 'User' })
    
    if (!table) {
        return next(new ErrorResponse('Table not found', 404))
    }

    const user = await User.findById(req.user.id).select('-password')

    const isMatch = await table.users.filter(element => element ? element._id.toString() === req.user.id : false)
    if (isMatch[0]) {
        
        return res.json(table)
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
//description  edit the table
//access       private
router.put('/:id', auth, asyncHandler( async(req, res, next) => {

    const { leave, player } = req.body;

    const user = await User.findById(req.user.id).select('-password')
    if (!user) {
        return next(new ErrorResponse('User not authorised', 401))
    }

    let table = await Table.findById(req.params.id)
    
    
    if ( player ) {
        
        const isStarted = await table.games.filter(element => element.started)
        if (isStarted[0]) {
            return next(new ErrorResponse('The game has already started', 422))
        }

        if (table.players.white && table.players.white.toString() === user._id.toString()) {
            table.players.white = undefined
        } else if (table.players.black && table.players.black.toString() === user._id.toString()) {
            table.players.black = undefined
        } else {
            if (player - 1 === 0) {

                if(!table.players.white) {
                    table.players.white = user._id
                }
            
            } else if (player - 1 === 1) {
                if(!table.players.black) {
                    table.players.black = user._id
                }
            }

        }
        
        await table.save()
        
        table = await Table.findById(req.params.id).populate({ path: 'players.white = user', model: 'User' }).populate({ path: 'players.black = user', model: 'User' })
        
        return res.json(table.players)
        
    }

    if ( leave ) {
        table.users = await table.users.filter(element => element._id.toString() !== user._id.toString());
        
        if (table.players) {
            if (table.players.white === user._id) {
                table.players.white = null
            } else if (table.players.black === user._id) {
                table.players.black = null
            }
        }
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

    const tables = await Table.find().sort({ date: -1 })
    
    res.json(tables)

}));

//route GET    api/tables/:id
//description  get table by id
//access       private
router.get('/:id', asyncHandler( async(req, res, next) => {

    let table = await Table.findById(req.params.id).populate({ path: 'users = user', model: 'User' }).populate({ path: 'games = game', model: 'Game' }).populate({ path: 'players.white = user', model: 'User' }).populate({ path: 'players.black = user', model: 'User' })
    
    
    if (!table) {
        return next(new ErrorResponse('Table does not exist', 404))
    }

    res.json(table)

}));


//route DELETE api/tables/:id
//description  delete table
//access       private
router.delete('/:id', auth, asyncHandler( async(req, res, next) => {


    const table = await Table.findById(req.params.id).populate({ path: 'users = user', model: 'User' }).populate({path: 'players = user', model: 'User'})

    
    const isMatch = await table.users.filter(element => element ? element._id.toString() === req.user.id : false);
    if (!isMatch[0]) {
        return next(new ErrorResponse('User not authorised', 401))
    }
    
    await table.remove()

    res.json(table)

}));


module.exports = router;