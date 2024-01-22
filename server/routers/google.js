const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', async (req, res, next) => {
  try {
    const {token} = req.body;
    const decodeToken = jwt.decode(token);
    res.status(200).json(decodeToken);
  } catch (error) {
    next(error);
  }
})


module.exports = router;