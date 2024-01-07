const express = require('express');
const router = express.Router();
const FaqController = require('../controllers/faqController');

router.post('/', FaqController.createFaq);
router.get('/', FaqController.getAllFaq);
router.patch('/:faq_id', FaqController.updateFaq);
router.delete('/:faq_id', FaqController.deleteFaq);

module.exports = router;