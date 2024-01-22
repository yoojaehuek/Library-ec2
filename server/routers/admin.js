const express = require('express');
const Admin = require('../database/schemas/admin');
const router = express.Router();
const crypto = require('crypto');

router.post('/login', async (req, res, next) => {
  try {
    const admin = await Admin.findOne({
      where: {
        admin_email: req.body.email
      }
    });
  
    if (!admin) {
      const errorMessage = "해당 id는 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      throw new Error(errorMessage);
    }

    console.log("id에 맞는 관리자 찾음: ", admin);
  
    // 입력한 비밀번호와 조회해온 암호화 난수 함침
    const combinedPassword = req.body.password + admin.salt;
    
    // 함친 combinedPassword 암호화
    const hashedPassword = crypto
      .createHash('sha512')
      .update(combinedPassword)
      .digest('hex');
  
    // hashedPassword와 DB의 비밀번호 비교
    if (hashedPassword === admin.admin_pwd) {
      console.log('Login successful!');
      res.status(200).json({status: '로그인 성공', data: admin.admin_id});
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
    const admin = await Admin.findAll({
      attributes: ['admin_email', 'admin_name'],
    });
    res.status(200).json(admin);
  } catch (error) {
    next(error);
  }
})

module.exports = router;