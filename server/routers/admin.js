const express = require('express');
const Admin = require('../database/schemas/admin');
const router = express.Router();
const crypto = require('crypto');

router.post('/login', async (req, res, next) => {
  try {
    const user = await Admin.findOne({
      where: {
        email: req.body.id
      }
    });
  
    if (!user) {
      const errorMessage = "해당 id는 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      throw new Error(errorMessage);
    }
  
    // 입력한 비밀번호와 조회해온 암호화 난수 함침
    const combinedPassword = req.body.password + user.salt;
  
    // 함친 combinedPassword 암호화
    const hashedPassword = crypto
      .createHash('sha512')
      .update(combinedPassword)
      .digest('hex');
  
    // hashedPassword와 DB의 비밀번호 비교
    if (hashedPassword === user.pwd) {
      console.log('Login successful!');
      res.status(200).json({status: '로그인 성공', data: user.id});
    }else {
      console.log('비밀번호 다름.');
      const errorMessage = "비밀번호 다름.";
      throw new Error(errorMessage);
    }
  } catch (error) {
    next(error);
  }
})

router.get('/allname', async (req, res, next) => {
  try {
    const user = await Admin.findAll({
      attributes: ['email', 'admin_name'],
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
})

module.exports = router;