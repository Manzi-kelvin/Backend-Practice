const Order = require('../models/Order');
const Product = require('../models/Product');

// 📊 Total Sales
exports.getTotalSales = async (req, res) => {
    try {
        const result = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice" }
                }
            }
        ]);

        res.json({
            totalSales: result[0]?.totalSales || 0
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 📊 Low Stock
exports.getLowStock = async (req, res) => {
    try {
        const products = await Product.find({
            productQuantity: { $lt: 5 }
        });

        res.json(products);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 📊 Best Selling Products
exports.getBestSellingProducts = async (req, res) => {
    try {

        const result = await Order.aggregate([

            // Split products array
            { $unwind: "$products" },

            // Group by product
            {
                $group: {
                    _id: "$products.product",
                    totalSold: { $sum: "$products.quantity" }
                }
            },

            // Sort highest first
            { $sort: { totalSold: -1 } },

            // Join product details
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },

            // Convert array to object
            { $unwind: "$productDetails" },

            // Clean response
            {
                $project: {
                    _id: 0,
                    productName: "$productDetails.productName",
                    category: "$productDetails.productCategory",
                    totalSold: 1
                }
            }

        ]);

        res.json(result);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



// 📊 Total Orders
exports.getTotalOrders = async (req, res) => {
    try {

        const totalOrders = await Order.countDocuments();

        res.json({
            totalOrders
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



// 📊 Orders By Status
exports.getOrdersByStatus = async (req, res) => {
    try {

        const result = await Order.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json(result);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



// 📊 Sales By Day
exports.getSalesByDay = async (req, res) => {
    try {

        const result = await Order.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createdAt"
                        }
                    },
                    totalSales: {
                        $sum: "$totalPrice"
                    }
                }
            },

            {
                $sort: { _id: 1 }
            }
        ]);

        res.json(result);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};