import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
// importing User model Es6 style
import User from '../models/User.js'

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({ message: 'User retreived', users })
    } catch (error) {
        res.status(500).json({ message: 'User not retreived', error: error.message })

    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.status(200).json({ message: 'Updated', user })
    } catch (error) {
        res.status(500).json({ message: 'Not Updated', error: error.message})
        
    }
}

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Deleted'})
    } catch (error) {
        res.status(500).json({ message: 'Not Deleted', error: error.message})
        
    }
}

export { getUsers, updateUser, deleteUser }