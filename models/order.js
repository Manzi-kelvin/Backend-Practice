const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            trim: true,
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ],
        status: {
            type: String,
            required: true,
            enum: ['Pending', 'Delivered', 'Processing'],
            default: 'Pending'
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Order', orderSchema)




































// const mongoose = require('mongoose')

// const orderSchema = new mongoose.Schema(
//     {
//         user: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User',
//             require: true
//         },
//         products: [
//             {
//                 product: {
//                     type: mongoose.Schema.Types.ObjectId,
//                     ref: 'Product',
//                     require: true,
//                     min: 0
//                 },
//                 quantity: {
//                     type: Number,
//                     require: true,
//                     min: 1
//                 }
//             }
//         ],
//         totalAmount: {
//             type: Number,
//             require: true,
//             min: 0
//         },
//         status: {
//             type: String,
//             enum: ['Pending', 'Processing', 'Delivered'],
//             default: 'Pending'
//         }
//     },
//     {
//         timestamps: true
//     }
// )

// module.exports = mongoose.model('Order', orderSchema)
