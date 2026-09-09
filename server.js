const express = require('express')
const app = express();

require('dotenv').config()
const connectDB = require('./config/db')
connectDB();

app.use(express.json())

const customerRoutes = require('./routes/customerRoute');
app.use('/api', customerRoutes)
const productsRoute = require('./routes/productsRoute');
app.use('/api', productsRoute)
const orderRoute = require('./routes/orderRoute');
app.use('/api', orderRoute)
const authRoutes = require("./routes/authRoute");
app.use("/api/auth", authRoutes);



app.listen( process.env.PORT, () => {
    console.log(`App is listening on port ${process.env.PORT}`)
})





















// const express = require('express')
// const app = express()
// const port = 5000;

// require("dotenv").config();
// const connectDB = require("./config/db");
// connectDB();

// app.use(express.json());

// const customerRoute = require("./routes/customerRoute");
// app.use("/api", customerRoute);

// app.listen(port, () => {
//     console.log(`server is listening on port ${port}`)
// })
