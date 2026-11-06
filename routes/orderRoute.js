import mongoose from 'mongoose'
import express from 'express'
const router = express.Router()

import {createOrder} from '../controllers/orderController.js'
import {getOrders} from '../controllers/orderController.js'
import {updateOrder} from '../controllers/orderController.js'
import {deleteOrder} from '../controllers/orderController.js'

router.post('/order', createOrder)
router.get('/order', getOrders)
router.put('/order/:id', updateOrder)
router.delete('/order/:id', deleteOrder)

export default router


