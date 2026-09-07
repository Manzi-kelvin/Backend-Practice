const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const {createOrder} = require('../controllers/orderController')
const {getOrders} = require('../controllers/orderController')
const {updateOrder} = require('../controllers/orderController')
const {deleteOrder} = require('../controllers/orderController')

router.post('/order', createOrder)
router.get('/order', getOrders)
router.put('/order/:id', updateOrder)
router.delete('/order/:id', deleteOrder)

module.exports = router

