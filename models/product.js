// Import Mongoose (ODM for MongoDB)
const mongoose = require('mongoose');

// Define schema (structure of your data)
const productSchema = new mongoose.Schema(
    {
        // 🔹 Product name
        productName: {
            type: String,
            required: true,
            trim: true // removes extra spaces
        },

        // 🔹 Product price
        productPrice: {
            type: Number,
            required: true,
            min: 0 // ensures price is not negative
        },

        // 🔹 Product quantity
        productQuantity: {
            type: Number,
            required: true,
            min: 0 // ensures quantity is not negative
        },

        // 🔹 Product Category
        productCategory: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        // 🔹 Schema options (SECOND argument, not inside fields)
        timestamps: true // adds createdAt & updatedAt automatically
    }
);

// Export model (used in controllers/routes)
module.exports = mongoose.model('Product', productSchema);