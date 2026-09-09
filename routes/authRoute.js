const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const { register } = require('../controllers/authController')
const { login } = require('../controllers/authController')

router.post('/auth/register', register)
router.post('/auth/login', login)

module.exports = router