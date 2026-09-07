const mongoose = require('mongoose')
const Order = require('../models/Order')

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const { customer, products, status } = req.body;

    const order = await Order.create({
      customer,
      products,
      status,
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Order not created",
      error: error.message,
    });
  }
};

// Get All Orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "-password")
      .populate("products.product", "name category quantity");

    res.status(200).json({
      message: "Orders retrieved successfully",
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Orders not retrieved",
      error: error.message,
    });
  }
};

// Update Order
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.status(200).json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Order not updated",
      error: error.message,
    });
  }
};

// delete Order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Order Delete successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Order not Delete",
      error: error.message,
    });
  }
};

