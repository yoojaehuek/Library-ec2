const express = require('express');
const router = express.Router();
const CrewController = require('../controllers/crewController');


router.post('/', CrewController.createCrew);
router.get('/', CrewController.getAllCrew);
router.patch('/:crew_id', CrewController.updateCrew);
router.delete('/:crew_id', CrewController.deleteCrew);

module.exports = router;
