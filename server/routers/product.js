const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

router.post('/', ProductController.createProduct);
router.get('/:product_id', ProductController.getOneProduct);
router.get('/subcategory/:product_id', ProductController.getCategoryProduct);
router.patch('/:product_id', ProductController.updateProduct);
router.delete('/:product_id', ProductController.deleteProduct);




module.exports = router;
