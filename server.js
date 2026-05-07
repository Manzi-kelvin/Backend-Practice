// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const recordRoutes = require('./routes/recordRoutes');

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('api is running');
// });

// app.use('/api/auth', authRoutes); // app.use(a,b)
// app.use('/api/records', recordRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
require('dotenv').config();

const connectDB = require('./config/db');
connectDB();

const express = require('express');
const app = express();


app.use(express.json());

// 🔗 Import Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reportRoutes = require('./routes/reportRoutes');

// 🔗 Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reports', reportRoutes);

// 🚀 Start Server
app.listen(process.env.PORT || 5000, () => {
    console.log('Server running...');
});