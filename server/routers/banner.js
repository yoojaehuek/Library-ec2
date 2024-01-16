const express = require('express');
const router = express.Router();
const BannerController = require('../database/controllers/bannerController');

router.post('/', BannerController.createBanner);
router.get('/', BannerController.getAllBanner);
router.get('/:banner_id', BannerController.getOneBanner);
router.patch('/:banner_id', BannerController.updateBanner);
router.delete('/:banner_id', BannerController.deleteBanner);

module.exports = router;