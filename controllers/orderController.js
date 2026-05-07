const Order = require('../models/Order');
const Product = require('../models/Product');

// 🟢 Place Order
exports.createOrder = async (req, res) => {
    try {
        const { customer, products } = req.body;

        let totalPrice = 0;

        // 🔥 Loop through products
        for (let item of products) {
            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            // ❌ Prevent out of stock
            if (product.productQuantity < item.quantity) {
                return res.status(400).json({
                    message: `${product.productName} is out of stock`
                });
            }

            // ✅ Reduce stock
            product.productQuantity -= item.quantity;
            await product.save();

            totalPrice += product.productPrice * item.quantity;
        }

        const order = await Order.create({
            customer,
            products,
            totalPrice
        });

        res.status(201).json(order);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔵 Get All Orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('customer')
            .populate('products.product');

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔵 Get Customer Orders
exports.getCustomerOrders = async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.params.customerId })
            .populate('products.product');

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🟡 Update Order Status
exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete order
exports.deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

