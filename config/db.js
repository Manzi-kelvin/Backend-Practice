const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected successfuly')  
    } catch (error) {
        console.log('MongoDB not connected', error.message)
    }
}

module.exports = connectDB;




























// const mongoose = require('mongoose')

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI)
//         console.log('MongoDB connected')
//     } catch (error) {
//         console.error('MongoDB not connected', error.message)
//     }
// }

// module.exports = connectDB;
