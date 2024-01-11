const express = require('express');
const router = express.Router();
const UserController = require('../database/controllers/userController');
const authMiddleware = require('../utils/authMiddleware');

router.post('/join', UserController.createUser);
router.post('/login', UserController.loginUser);
router.post('/naver-login', UserController.naverLogin)
router.get('/one', authMiddleware, UserController.detailUser);
router.patch('/', authMiddleware, UserController.putUser);
router.delete('/', authMiddleware, UserController.deleteUser);
router.get('/logout', (req, res) => {
  console.log("logout");
  res.cookie('accessToken',{},{
    httpOnly : true,
    secure : false,
    sameSite : 'strict',
  })
  res.cookie('refreshToken',{},{
    httpOnly : true,
    secure : false,
    sameSite : 'strict',
  })
  res.status(200).end();
});

// router.get('/one', UserController.detailUser);
// router.patch('/', UserController.putUser);
// router.delete('/', UserController.deleteUser);

module.exports = router;
