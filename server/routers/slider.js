const express = require('express');
const router = express.Router();
const SliderController = require('../controllers/sliderController');

router.post('/', SliderController.createSlider);
router.get('/', SliderController.getAllSlider);
router.patch('/:slider_id', SliderController.updateSlider);
router.delete('/:slider_id', SliderController.deleteSlider);

module.exports = router;