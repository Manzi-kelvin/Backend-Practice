import mongoose from 'mongoose'
import Product from '../models/Product.js'

const createProduct = async (req, res) => {
    try {
        const { name, price, category, quantity } = req.body

        const existingProduct = await Product.findOne({
            $or: [{name}]
        })

        if (!name || !price || !category || !quantity) {
            res.status(400).json({ message: "All feilds are required"})
        } 
        
        if (existingProduct) {
            res.status(400).json({ message: "Product exists"})
        }

        const product = Product.create({
            name,
            price,
            category,
            quantity
        })
        res.status(201).json({ message: 'Product created successfuly', product })
    } catch (error) {
        res.status(500).json({ message: 'Product not created', error: error.message })

    }
}

const getProduct = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({ message: 'Product retreived', products })
    } catch (error) {
        res.status(500).json({ message: 'Product not retreived', error: error.message })

    }
}

const updateProduct = async (req, res) => {
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

const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Product Deleted'})
    } catch (error) {
        res.status(500).json({ message: 'Product Not Deleted', error: error.message})
        
    }
}

export { createProduct, getProduct, updateProduct, deleteProduct }