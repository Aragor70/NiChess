const express = require('express');
const GameController = require('../../controllers/GameController');
const asyncHandler = require('../../middlewares/async');
const auth = require('../../middlewares/auth');
const Game = require('../../models/Game');
const Table = require('../../models/Table');
const User = require('../../models/User');
const ErrorResponse = require('../../utils/ErrorResponse');
const initBoard = require('../../utils/initBoard');
const isCorrectMove = require('../../utils/isCorrectMove');
const router = express.Router();

const gameController = GameController;


//route GET    api/games/
//description  get the game
//access       private
router.get('/:id', auth, gameController.getGame);



//route POST   api/games/
//description  create the game
//access       private
router.post('/', auth, gameController.createGame);


//route PUT    api/games/:id
//description  game changes
//access       private
router.put('/:id', auth, gameController.updateGame);

module.exports = router;