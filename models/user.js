const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6
        },
        address: {
            type: String,
            required: true,
            trim: true,
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)






























// const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             require: true,
//             trim: true
//         },
//         email: {
//             type: String,
//             require: true,
//             trim: true,
//             unique: true,
//             lowercase: true
//         },
//         password: {
//             type: String,
//             require: true,
//             minlength: 6
//         },
//         address: {
//             type: String,
//             require: true,
//             trim: true
//         }
//     },
//     {
//         timestamps: true
//     }
// )

// module.exports = mongoose.model('User', userSchema)
