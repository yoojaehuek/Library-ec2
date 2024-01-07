const express = require('express');
const router = express.Router();
const StoreController = require('../controllers/storeController.js');

router.post('/', StoreController.createStore);
router.get('/', StoreController.getAllStore);
router.get('/mcdelivery', StoreController.getMcdelivery);
router.get('/:store_id', StoreController.getOneStore);
router.patch('/:store_id', StoreController.updateStore);
router.delete('/:store_id', StoreController.deleteStore);

module.exports = router;