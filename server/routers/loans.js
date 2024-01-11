const express = require('express');
const router = express.Router();
const LoansController = require('../database/controllers/loansController');

// router.post('/', authMiddleware, LoansController.addLoans); //미들웨어를 넘겨야 addLoans 를 실행
router.post('/', LoansController.addLoans);
router.get('/', LoansController.getAllLoans);
router.get('/:loans_id', LoansController.getAllLoans);
router.patch('/:loans_id', LoansController.updateLoans);
router.delete('/:loans_id', LoansController.deleteLoans);

module.exports = router;