const mongoose = require('mongoose')
const Product = require('../models/Product')

exports.createProduct = async (req, res) => {
    try {
        const { name, category, quantity } = req.body

        const product = Product.create({
            name,
            category,
            quantity
        })
        res.status(201).json({ message: 'Product created successfuly', product })
    } catch (error) {
        res.status(500).json({ message: 'Product not created', error: error.message })

    }
}

exports.getProduct = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({ message: 'Product retreived', products })
    } catch (error) {
        res.status(500).json({ message: 'Product not retreived', error: error.message })

    }
}

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.status(200).json({ message: 'Product Updated', product})
    } catch (error) {
        res.status(500).json({ message: 'Product Not Updated', error: error.message})
        
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Product Deleted'})
    } catch (error) {
        res.status(500).json({ message: 'Product Not Deleted', error: error.message})
        
    }
}
