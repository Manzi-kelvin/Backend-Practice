import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoute.js'
import productsRoute from  './routes/productsRoute.js'
import authRoutes from "./routes/authRoute.js"
import orderRoute from './routes/orderRoute.js'

const app = express();
connectDB();

app.use(express.json())

app.use('/api', userRoutes)
app.use('/api', productsRoute)
app.use('/api', orderRoute)
app.use("/api", authRoutes);


app.listen( process.env.PORT, () => {
    console.log(`App is listening on port ${process.env.PORT}`)
})





















// const express  'express')
// const app = express()
// const port = 5000;

// require("dotenv").config();
// const connectDB  "./config/db");
// connectDB();

// app.use(express.json());

// const customerRoute  "./routes/customerRoute");
// app.use("/api", customerRoute);

// app.listen(port, () => {
//     console.log(`server is listening on port ${port}`)
// })
