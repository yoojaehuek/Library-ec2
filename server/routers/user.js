const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../utils/authMiddleware');

router.post('/join', UserController.createUser);
router.post('/login', UserController.loginUser);
router.get('/one', authMiddleware, UserController.detailUser);
router.patch('/', authMiddleware, UserController.putUser);
router.delete('/', authMiddleware, UserController.deleteUser);

// router.get('/one', UserController.detailUser);
// router.patch('/', UserController.putUser);
// router.delete('/', UserController.deleteUser);

module.exports = router;
