const express = require('express');
const router = express.Router();
const ReviewController = require('../database/controllers/reviewController');
const authMiddleware = require('../utils/authMiddleware');

router.post('/', authMiddleware, ReviewController.createReview); //작성
router.get('/', ReviewController.getAllReview); //전체조회
router.get('/check', authMiddleware, ReviewController.reviewCheck); //리뷰 썼는지 체크
router.get('/:review_id', ReviewController.getOneReview); //단일조회
router.patch('/:review_id', ReviewController.updateReview); //수정
router.delete('/:review_id', ReviewController.deleteReview); //삭제

module.exports = router;