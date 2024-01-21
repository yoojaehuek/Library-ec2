


const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const {access_token} = req.body;
    console.log("카카오 access_token: ", access_token);

    var request = require('request');
    var options = {
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
    };

    request.post(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        console.log("카카오로그인 body: ", JSON.parse(body));
        const userData = JSON.parse(body);
        res.status(200).json(userData);
        //여기서 쿠키 설정해주기?
      } else {
        res.status(response.statusCode).end();
        console.log("error = " + response.statusCode);
      }
    });
    // console.log("kakaoResponse.data: ", kakaoResponse.data);
  } catch (error) {
    next(error);
  }
})


module.exports = router;