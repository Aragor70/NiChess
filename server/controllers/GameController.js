const asyncHandler = require("../middlewares/async");
const Game = require("../models/Game");
const Table = require("../models/Table");
const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const initBoard = require("../utils/initBoard");
const isCorrectMove = require("../utils/isCorrectMove");



class GameController {

    getGame = asyncHandler( async(req, res, next) => {

        const game = await Game.findById(req.params.id).populate({path: 'players = user', model: 'User'})
    
        if (!game) {
            return next(new ErrorResponse('Game does not exist', 404)); 
        }
    
        res.json(game)
        
    })

    createGame = asyncHandler( async(req, res, next) => {

        const { players, tableid } = req.body;
    
        if (!players || !tableid) {
            return next(new ErrorResponse('Table does not exist', 422));
        }
        
    
        let user;
    
        if (req.user) {
            user = await User.findById(req.user.id)
        }
        if (players[0] === players[1]) {
            return next(new ErrorResponse('You cannot fight with yourself', 422));
        }
        let opponentid = players.filter(element => element.toString() !== user._id)
    
        let opponent = await User.findById(opponentid[0])
    
    
        if (!opponent) {
            return next(new ErrorResponse('Opponent not found', 422));
        }
    
        const table = await Table.findById(tableid).populate({ path: 'games = game', model: 'Game' })
    
        const allFinished = await table.games.filter( i => i.finished === false )
        
        if (allFinished[0]) {
            console.log(`${allFinished.length} games are not finished`)
            return next(new ErrorResponse('Please wait for other game', 422));
        }
    
    
        const board = await initBoard(players[0], players[1])
    
        let game = new Game({
            players: players,
            board,
            score: [0, 0]
        })
        await game.save();
        
        table.games = [ ...table.games, game]
    
        await table.save()
    
        game = await Game.findById(game._id).populate({path: 'players = user', model: 'User'})
        res.json(game)
    })

    updateGame = asyncHandler( async(req, res, next) => {

        const { started } = req.body;
    
        
        const user = await User.findById(req.user.id)
    
        if (!user) {
            return next(new ErrorResponse('User not authorized', 401)); 
        }
    
        let game = await Game.findById(req.params.id).populate({path: 'players = user', model: 'User'})
    
        if (!game) {
            return next(new ErrorResponse('Game does not exist', 404));
        }
        if (started) {
            game.started = true
        }
        if (req.body.surrender) {
            
            if (game.players[0]._id.toString() === user._id.toString() ) {
                game.score[1] += 1
            } else if (game.players[1]._id.toString() === user._id.toString() ) {
                game.score[0] += 1
            } else {
                return next(new ErrorResponse('Player not found', 404)); 
            }
    
            game.finished = true
        }
        if (req.body.draw) {
            game.score[0] += 0.5;
            game.score[1] += 0.5;
            
            
            game.markModified('score');
            
            game.finished = true
        }
        if (req.body.promotion && req.body.position) {
    
            if (req.body.position.y !== 0 && req.body.position.y !== 7) {
                return next(new ErrorResponse('This piece cannot be promoted', 422)); 
            }
    
            game.board[req.body.position.x].type = req.body.promotion
    
            game.markModified('board');
        }
    
        if (req.body.selected && req.body.next) {
    
            const selectedField = game.board[req.body.selected.position.x]
            const nextField = game.board[req.body.next.position.x]
            
            
            if (JSON.stringify(selectedField) !== JSON.stringify(req.body.selected) || JSON.stringify(nextField) !== JSON.stringify(req.body.next)) {
                
                return next(new ErrorResponse('Please refresh the page', 422)); 
            }
    
            if (game.finished) {
                return next(new ErrorResponse('The game is finished', 422)); 
            }
    
            let player;
    
            if (game.turn === 0 && game.players[0]._id.toString() === user._id.toString() ) {
                game.turn = 1
                player = 1
            } else if (game.turn === 1 && game.players[1]._id.toString() === user._id.toString() ) {
                game.turn = 0
                player = 2
            } else {
                console.log(game.players[1]._id, user._id)
                return next(new ErrorResponse('Player not found', 404)); 
            }
    
            
            const isCorrect = await isCorrectMove(selectedField, nextField, game.board, user, player, game.history, game)
            if (!isCorrect) {
                return next(new ErrorResponse('Move not correct', 422));
            }
    
            game.board[req.body.next.position.x] = await { position: { y: nextField.position.y, x: nextField.position.x }, color: nextField.color, player: selectedField.player, type: selectedField.type }
            
            game.board[req.body.selected.position.x] = await { position: { y: selectedField.position.y, x: selectedField.position.x }, color: selectedField.color, player: null, type: null }
    
            if (req.body.next.type === 'King') {
                game.score[player - 1] += 1
                game.finished = true
            }
            game.history.unshift({ prev: req.body.selected, next: req.body.next })
    
            await game.save()
    
            return res.json({ selected: selectedField, next: nextField })
    
        }
    
        await game.save()
    
    
        res.json(game)
        
    })

}

module.exports = GameController;