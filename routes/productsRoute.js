import mongoose from 'mongoose'
import express from 'express'

const router = express.Router()

import { createProduct } from '../controllers/productController.js'
import { getProduct } from '../controllers/productController.js'
import { updateProduct } from '../controllers/productController.js'
import { deleteProduct } from '../controllers/productController.js'

router.post('/product', createProduct)
router.get('/product', getProduct)
router.put('/product/:id', updateProduct )
router.delete('/product/:id', deleteProduct )

export default router
