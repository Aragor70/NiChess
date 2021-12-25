const express = require('express');
const GameController = require('../../controllers/GameController');
const auth = require('../../middlewares/auth');
const router = express.Router();

const gameController = new GameController;


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