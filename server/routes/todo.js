const router = require('express').Router();
const {verifyToken} = require('../middleware/verifyToken');
const {gettodo,createtodo,updatetodo,deletetodo} = require('../controllers/todo');

// get todo
router.get('/',verifyToken,gettodo);

// create todo
router.post('/',verifyToken,createtodo);

// update todo
router.put('/:id',verifyToken,updatetodo);

// delete todo
router.delete('/:id',verifyToken,deletetodo);

module.exports = router;