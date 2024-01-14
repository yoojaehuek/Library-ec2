const express = require('express');
const router = express.Router();
const LoansController = require('../database/controllers/loansController');

// router.post('/', authMiddleware, LoansController.addLoans); //미들웨어를 넘겨야 addLoans 를 실행
router.post('/', LoansController.addLoans);
router.get('/', LoansController.getAllLoans);//전체조회
router.get('/:loans_id', LoansController.getAllLoans);//한개조회
router.patch('/:loans_id', LoansController.updateLoans);
router.patch('/return/:loans_id', LoansController.returnLoans);// 반납
router.patch('/renew/:loans_id', LoansController.renewLoans);// 기간연장
router.delete('/:loans_id', LoansController.deleteLoans); //대출 삭제

module.exports = router;