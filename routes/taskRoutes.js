const express = require('express');
const { createTask, getAllTasks, updateTask, deleteTask } = require('../controllers/taskControllers');
const { verifyToken, isAdmin, isManagerOrAdmin } = require('../middleware/auth');
const router = express.Router();

router.post('/', [verifyToken, isManagerOrAdmin], createTask);
router.get('/', [verifyToken], getAllTasks);
router.put('/:id', [verifyToken, isManagerOrAdmin], updateTask);
router.delete('/:id', [verifyToken, isAdmin], deleteTask);

module.exports = router;
