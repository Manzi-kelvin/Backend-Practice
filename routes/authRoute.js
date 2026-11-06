import mongoose from 'mongoose'
import express from 'express'
const router = express.Router()

import { register } from '../controllers/authController.js'
import { login } from '../controllers/authController.js'

router.post('/auth/register', register)
router.post('/auth/login', login)

export default router