// // Import Mongoose (ODM for MongoDB)
// const mongoose = require('mongoose');

// // Define schema (structure of your data)
// const orderSchema = new mongoose.Schema(
//     {
//         // 🔹 Reference to Customer model (foreign key)
//         customer: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Customer', // refers to Customer collection
//             required: true
//         },

//         // 🔹 Reference to product model (foreign key)
//         product: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Product', // refers to Product collection
//             required: true
//         },

//         // 🔹 Product price
//         totalPrice: {
//             type: Number,
//             required: true,
//             min: 0 // ensures price is not negative
//         },

//         // 🔹 Product quantity
//         status: {
//             type: String,
//             required: true,
//             enum: ['pending', 'processing', 'shipped', 'delivered'] // ensures status is one of these values
//         }
//     },
//     {
//         // 🔹 Schema options (SECOND argument, not inside fields)
//         timestamps: true // adds createdAt & updatedAt automatically
//     }
// );

// // Export model (used in controllers/routes)
// module.exports = mongoose.model('order', orderSchema);

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
{
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        required: true
    },

    // ✅ Allow multiple products in one order
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],

    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },

    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered'],
        default: 'pending'
    }
},
{ timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);