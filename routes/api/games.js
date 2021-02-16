const express = require('express');
const asyncHandler = require('../../middlewares/async');
const auth = require('../../middlewares/auth');
const Game = require('../../models/Game');
const Guest = require('../../models/Guest');
const Table = require('../../models/Table');
const User = require('../../models/User');
const ErrorResponse = require('../../utils/ErrorResponse');
const initBoard = require('../../utils/initBoard');
const router = express.Router();



//route GET    api/games/
//description  get the game
//access       private
router.get('/:id', auth, asyncHandler( async(req, res, next) => {

    const game = await Game.findById(req.params.id)

    if (!game) {
        return next(new ErrorResponse('Game does not exist', 404)); 
    }

    res.json(game)
    
}));



//route POST   api/games/
//description  create the game
//access       private
router.post('/', auth, asyncHandler( async(req, res, next) => {

    const { opponentid, tableid } = req.body;

    if (!opponentid || !tableid) {
        return next(new ErrorResponse('Table does not exist', 422));
    }

    let user;

    if (req.user) {
        user = await User.findById(req.user.id)
    } else {
        user = await Guest.findOne({ ip: req.headers['x-forwarded-for']})
    }
    let opponent = await User.findById(opponentid)
    if (!opponent) {
        opponent = await Guest.findById(opponentid)
    }

    if (!opponent) {
        return next(new ErrorResponse('Opponent not found', 422));
    }

    const board = await initBoard()

    const game = new Game({
        players: [user, opponent],
        board
    })
    await game.save();

    const table = await Table.findById(tableid)

    table.games = [ ...table.games, game]

    await table.save()

    res.json(game)
}));


//route PUT    api/games/:id
//description  start the game
//access       private
router.put('/:id', auth, asyncHandler( async(req, res, next) => {

    const { started } = req.body;

    const game = await Game.findById(req.params.id)

    if (!game) {
        return next(new ErrorResponse('Game does not exist', 404)); 
    }

    
    if (started) {
        game.started = true
    }
    
    await game.save()

    res.json(game)
    
}));

module.exports = router;