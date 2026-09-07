const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Customer = require('../models/User')


exports.createCustomer = async (req, res) => {
    try {
        const { name, email, password, address } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)

        const customer = Customer.create({
            name,
            email,
            password: hashedPassword,
            address
        })
        res.status(201).json({ message: 'Customer created successfuly' })
    } catch (error) {
        res.status(500).json({ message: 'Customer not created', error: error.message })

    }
}

exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find()
        res.status(200).json({ message: 'Customers retreived', customers })
    } catch (error) {
        res.status(500).json({ message: 'Customer not retreived', error: error.message })

    }
}

exports.updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.status(200).json({ message: 'Updated', customer})
    } catch (error) {
        res.status(500).json({ message: 'Not Updated', error: error.message})
        
    }
}

exports.deleteCustomer = async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Deleted'})
    } catch (error) {
        res.status(500).json({ message: 'Not Deleted', error: error.message})
        
    }
}