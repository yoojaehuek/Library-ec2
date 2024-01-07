const express = require('express');
const router = express.Router();
const OptionController = require('../controllers/optionController');

router.post('/', OptionController.createOption);
router.get('/', OptionController.getAllOption);
router.get('/:option_id', OptionController.getOneOption);
router.patch('/:option_id', OptionController.updateOption);
router.delete('/:option_id', OptionController.deleteOption);

module.exports = router;