const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const { createCustomer } = require('../controllers/customerController')
const { getCustomers } = require('../controllers/customerController')
const { updateCustomer } = require('../controllers/customerController')
const { deleteCustomer } = require('../controllers/customerController')

router.post('/customer', createCustomer)
router.get('/customer', getCustomers)
router.put('/customer/:id', updateCustomer )
router.delete('/customer/:id', deleteCustomer )

module.exports = router