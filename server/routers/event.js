const express = require('express');
const router = express.Router();
const EventController = require('../database/controllers/eventController');

router.post('/', EventController.createEvent);
router.get('/', EventController.getAllEvent);
router.get('/page', EventController.getPageEvent);
// router.get('/', EventController.getCategoryEvent);
// router.get('/search/:input', EventController.getSearchEvent);
router.get('/:event_id', EventController.getOneEvent);
router.patch('/:event_id', EventController.updateEvent);
router.delete('/:event_id', EventController.deleteEvent);

module.exports = router;