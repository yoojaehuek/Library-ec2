const express = require('express');
const router = express.Router();
const LoansController = require('../database/controllers/loansController');

router.post('/', LoansController.addLoans);
router.get('/', LoansController.getAllLoans);
router.get('/:loans_id', LoansController.getAllLoans);
router.patch('/:loans_id', LoansController.updateLoans);
router.delete('/:loans_id', LoansController.deleteLoans);

module.exports = router;