const express = require('express');
const router = express.Router();
const MaterialController = require('../controllers/materialController');


router.post('/', MaterialController.createMaterial);
router.get('/', MaterialController.getAllMaterial);
router.patch('/:material_id', MaterialController.updateMaterial);
router.delete('/:material_id', MaterialController.deleteMaterial);

module.exports = router;
