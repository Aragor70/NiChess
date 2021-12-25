const express = require('express');
const TableController = require('../../controllers/TableController');
const asyncHandler = require('../../middlewares/async');
const auth = require('../../middlewares/auth');
const Table = require('../../models/Table');
const User = require('../../models/User');
const ErrorResponse = require('../../utils/ErrorResponse');
const router = express.Router();

const tableController = TableController;

//route POST   api/tables
//description  create table
//access       private
router.post('/', auth, tableController.createTable);



//route POST   api/tables/:id
//description  join to the table
//access       private
router.post('/:id', auth, tableController.joinToTable);

//route PUT    api/tables/:id
//description  edit the table
//access       private
router.put('/:id', auth, tableController.updateTable);


//route GET    api/tables
//description  get tables list
//access       private
router.get('/', tableController.getTables);

//route GET    api/tables/:id
//description  get table by id
//access       private
router.get('/:id', tableController.getTableById);


//route DELETE api/tables/:id
//description  delete table
//access       private
router.delete('/:id', auth, tableController.deleteTable);


module.exports = router;