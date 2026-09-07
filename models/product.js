const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 0
        },
        category: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Product', productSchema)
























// const mongoose = require('mongoose')

// const productSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             require: true,
//             trim: true
//         },
//         price: {
//             type: Number,
//             require: true,
//             trim: true,
//             min: 0
//         },
//         quantity: {
//             type: Number,
//             require: true,
//             min: 0
//         },
//         category: {
//             type: String,
//             require: true,
//             trim: true
//         }
//     },
//     {
//         timestamps: true
//     }
// )

// module.exports = mongoose.model('Product', productSchema)
