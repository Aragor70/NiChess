const express = require('express');
const asyncHandler = require('../../middlewares/async');
const auth = require('../../middlewares/auth');
const Game = require('../../models/Game');
const Guest = require('../../models/Guest');
const Table = require('../../models/Table');
const User = require('../../models/User');
const ErrorResponse = require('../../utils/ErrorResponse');
const initBoard = require('../../utils/initBoard');
const isCorrectMove = require('../../utils/isCorrectMove');
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

    const table = await Table.findById(tableid).populate({ path: 'games = game', model: 'Game' })

    const allFinished = table.games.filter( i => i.finished === false )
    
    if (allFinished[0]) {
        console.log(`${allFinished.length} games are not finished`)
        return next(new ErrorResponse('Please wait for other game', 422));
    }


    const board = await initBoard(user, opponent)

    const game = new Game({
        players: [user, opponent],
        board
    })
    await game.save();

    
    table.games = [ ...table.games, game]

    await table.save()

    res.json(game)
}));


//route PUT    api/games/:id
//description  game changes
//access       private
router.put('/:id', auth, asyncHandler( async(req, res, next) => {

    const { started } = req.body;

    let user;
    if (req.user) {
        user = await User.findById(req.user.id)
    } else {
        user = await Guest.findOne({ ip: req.headers['x-forwarded-for'] })
    }

    if (!user) {
        return next(new ErrorResponse('User not authorized', 401)); 
    }

    const game = await Game.findById(req.params.id)

    if (!game) {
        return next(new ErrorResponse('Game does not exist', 404)); 
    }
    if (started) {
        game.started = true
    }

    if (req.body.selected && req.body.next) {

        // check the movement
        const isCorrect = await isCorrectMove(req.body.selected, req.body.next, game.board, user)
        //console.log(isCorrect)
        if (!isCorrect) {
            return next(new ErrorResponse('Move not correct', 422));
        }
        //console.log(req.body.selected)

        game.board[req.body.next.position.x] = await { position: { y: game.board[req.body.next.position.x].position.y, x: game.board[req.body.next.position.x].position.x }, color: game.board[req.body.next.position.x].color, player: req.body.selected.player, type: req.body.selected.type }
        
        game.board[req.body.selected.position.x] = await { position: { y: game.board[req.body.selected.position.x].position.y, x: game.board[req.body.selected.position.x].position.x }, color: game.board[req.body.selected.position.x].color, player: null, type: null }
        

        console.log(game.board)
    }

    await game.save()

    res.json(game)
    
}));

module.exports = router;