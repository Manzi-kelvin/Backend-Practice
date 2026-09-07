const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const { createProduct } = require('../controllers/productController')
const { getProduct } = require('../controllers/productController')
const { updateProduct } = require('../controllers/productController')
const { deleteProduct } = require('../controllers/productController')

router.post('/product', createProduct)
router.get('/product', getProduct)
router.put('/product/:id', updateProduct )
router.delete('/product/:id', deleteProduct )

module.exports = router