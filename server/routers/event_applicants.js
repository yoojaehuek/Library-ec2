const express = require('express');
const router = express.Router();
const Event_applicantsController = require('../database/controllers/event_applicantsController');
const authMiddleware = require('../utils/authMiddleware');

router.post('/', Event_applicantsController.createEvent_applicants);
router.get('/', Event_applicantsController.getAllEvent_applicants);
router.get('/user', authMiddleware, Event_applicantsController.getAllByUser);
router.get('/:event_id', Event_applicantsController.getOneEvent_applicants);
router.patch('/:event_id', Event_applicantsController.updateEvent_applicants);

module.exports = router;