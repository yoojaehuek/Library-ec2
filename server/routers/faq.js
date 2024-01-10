const express = require('express');
const router = express.Router();
const FaqController = require('../database/controllers/faqController');

router.post('/', FaqController.createFaq);
router.get('/', FaqController.getAllFaq);
router.get('/category/:category', FaqController.getCategoryFaq);
router.get('/:faq_id', FaqController.getOneFaq);
router.patch('/:faq_id', FaqController.updateFaq);
router.delete('/:faq_id', FaqController.deleteFaq);

module.exports = router;