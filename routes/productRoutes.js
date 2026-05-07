const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

// 📦 Product Routes
router.post('/', protect, createProduct);              // Create product
router.get('/', getProducts);                 // Get all 
router.get('/:id', getProductById);           // Get single
router.put('/:id', protect, updateProduct);            // Update
router.delete('/:id', protect, deleteProduct);         // Delete

module.exports = router;