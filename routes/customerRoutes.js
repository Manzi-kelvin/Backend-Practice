const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');


const {
    createCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customerController');

// 👤 Customer Routes
router.post('/', protect, createCustomer);         // Create customer
router.get('/', protect, getCustomers);            // Get all customers
router.put('/:id', protect, updateCustomer);       // Update customer
router.delete('/:id', protect, deleteCustomer);    // Delete customer

module.exports = router;