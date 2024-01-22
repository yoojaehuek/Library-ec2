const express = require('express');
const router = express.Router();
const LoansController = require('../database/controllers/loansController');
const authMiddleware = require('../utils/authMiddleware');

router.post('/', authMiddleware, LoansController.addLoans); //미들웨어를 넘겨야 addLoans 를 실행
router.get('/', LoansController.getAllLoans);//전체조회
router.get('/desc', LoansController.getAllLoansDESC);//전체조회 최신순
router.get('/BooksBorrowedByUser/:user_id', LoansController.getBooksBorrowedByUser);//유저의 대출정보 조회
router.get('/UsersByBookBorrowed/:book_id', LoansController.getUsersByBookBorrowed);//책을 대출한 유저들 불러오기
router.get('/RecentBorrowedBooksAndUsers', LoansController.getRecentBorrowedBooksAndUsers);//최근대출순으로 책 , 유저 불러오기
router.get('/userbyloans', authMiddleware, LoansController.getLoansByUserId);//유저대출조회
router.get('/:loans_id', LoansController.getAllLoans);//한개조회
// router.patch('/:loans_id', LoansController.updateLoans);// 대출수정
router.patch('/return/:loans_id', LoansController.returnLoans);// 반납
router.patch('/renew/:loans_id', LoansController.renewLoans);// 기간연장
router.delete('/:loans_id', LoansController.deleteLoans); //대출 삭제

module.exports = router;