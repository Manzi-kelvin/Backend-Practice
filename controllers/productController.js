const Product = require('../models/Product');

// 🟢 Create Product
exports.createProduct = async (req, res) => {
    try {

        const {
            productName,
            productPrice,
            productQuantity,
            productCategory
        } = req.body;

        // ✅ Validate required fields
        if (
            !productName ||
            !productPrice ||
            !productQuantity ||
            !productCategory
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // ✅ Check if product already exists
        const existingProduct = await Product.findOne({
            productName: productName.trim()
        });

        if (existingProduct) {
            return res.status(400).json({
                message: "Product already exists"
            });
        }

        // ✅ Create new product
        const product = await Product.create({
            productName,
            productPrice,
            productQuantity,
            productCategory
        });

        res.status(201).json(product);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// 🔵 Get All Products + Search + Filter
exports.getProducts = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, sort } = req.query;

        let filter = {};

        if (category) filter.productCategory = category;
        if (minPrice || maxPrice) {
            filter.productPrice = {};
            if (minPrice) filter.productPrice.$gte = minPrice;
            if (maxPrice) filter.productPrice.$lte = maxPrice;
        }

        let query = Product.find(filter);

        if (sort) {
            query = query.sort(sort); // e.g ?sort=productPrice
        }

        const products = await query;
        res.json(products);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔵 Get Single Product
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ message: "Not found" });

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🟡 Update Product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔴 Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};