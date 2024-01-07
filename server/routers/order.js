const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const authMiddleware = require('../utils/authMiddleware');


router.post('/', authMiddleware, OrderController.addOrder);
router.get('/all', OrderController.getAllOrder);
router.get('/', authMiddleware, OrderController.getOrderByUserId);
router.get('/date', authMiddleware, OrderController.findAllOrderDate);
router.get('/rank', OrderController.rankMenu);
router.get('/:order_id', OrderController.getOrderByOrderId);
router.patch('/:order_id', OrderController.updateOrder);
router.delete('/:order_id', OrderController.deleteOrder);

//테스트용 로그인 안해도 가능
// router.post('/', OrderController.addOrder);
// router.get('/', OrderController.getOrderByUserId);
// router.get('/date', OrderController.findAllOrderDate);
// router.get('/:order_id', OrderController.getOrderByOrderId);
// router.patch('/:order_id', OrderController.updateOrder);
// router.delete('/:order_id', OrderController.deleteOrder);

module.exports = router;