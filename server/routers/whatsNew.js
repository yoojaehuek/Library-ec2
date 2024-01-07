const express = require('express');
const router = express.Router();
const WhatsNewController = require('../controllers/whatsNewController');


router.post('/', WhatsNewController.createWhatsNew)
router.get('/', WhatsNewController.getMainPageWhatsNew);
router.get('/:subcategory_id', WhatsNewController.getCategoryWhatsNew);
router.get('/:subcategory_id/:whatsnew_id', WhatsNewController.getOneWhatsNew);
router.patch('/:whatsnew_id', WhatsNewController.updateWhatsNew);
router.delete('/:whatsnew_id', WhatsNewController.deleteWhatsNew);

module.exports = router;