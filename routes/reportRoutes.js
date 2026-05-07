const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');


const {
    getTotalSales,
    getLowStock,
    getBestSellingProducts,
    getTotalOrders,
    getOrdersByStatus,
    getSalesByDay
} = require('../controllers/reportController');

// 📊 Report Routes
router.get('/sales', protect, getTotalSales); // Total sales

router.get('/low-stock', protect, getLowStock); // Low stock products

router.get('/best-selling', protect, getBestSellingProducts); // Best selling products

router.get('/total-orders', protect, getTotalOrders); // Total orders

router.get('/orders-status', protect, getOrdersByStatus);// Orders by status

router.get('/sales-by-day', protect, getSalesByDay);// Sales by day

module.exports = router;