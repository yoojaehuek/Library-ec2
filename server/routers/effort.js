const express = require('express');
const router = express.Router();
const EffortController = require('../controllers/effortController');

router.post('/', EffortController.createEffort);
router.get('/', EffortController.getAllEffort);
router.patch('/:effort_id', EffortController.updateEffort);
router.delete('/:effort_id', EffortController.deleteEffort);

module.exports = router;
