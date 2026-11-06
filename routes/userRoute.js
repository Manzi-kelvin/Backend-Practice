import mongoose from 'mongoose'
import express from 'express'
import { getUsers } from '../controllers/userController.js'
import { updateUser } from '../controllers/userController.js'
import { deleteUser } from '../controllers/userController.js'

const router = express.Router()

router.get('/users', getUsers)
router.put('/user/:id', updateUser )
router.delete('/user/:id', deleteUser )

export default router
