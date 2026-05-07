const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');


const {
    createOrder,
    getOrders,
    getCustomerOrders,
    updateOrderStatus,
    deleteOrder
} = require('../controllers/orderController');

// 🛒 Order Routes
router.post('/', protect, createOrder);                            // Place order
router.get('/', protect, getOrders);                               // All orders
router.get('/customer/:customerId', protect, getCustomerOrders);   // Orders by customer
router.put('/:id/status', protect, updateOrderStatus);             // Update status
router.delete('/:id', protect, deleteOrder);             // Delete Order

module.exports = router;