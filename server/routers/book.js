const express = require('express');
const router = express.Router();
const BookController = require('../database/controllers/bookController');

router.post('/', BookController.createBook);
// router.get('/', BookController.getAllBook);
router.get('/', BookController.getCategoryBook);
router.get('/search/:input', BookController.getSearchBook);
router.patch('/:book_id', BookController.updateBook);
router.delete('/:book_id', BookController.deleteBook);

module.exports = router;