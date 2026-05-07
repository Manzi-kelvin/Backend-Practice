// Importing the Mongoose library, which is an Object Data Modeling (ODM) tool for MongoDB and Node.js. 
// It provides a schema-based solution to model application data and includes built-in type casting, validation, 
// query building, and business logic hooks.
const mongoose = require('mongoose');

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // mongoose.connect() is a method that establishes a connection to the MongoDB database. 
        // It takes the connection string (URI) as an argument, which is typically stored in an environment variable for security 
        // reasons. The method returns a promise, so we use await to wait for the connection to be established before proceeding 
        // with the rest of the code.
        await mongoose.connect(process.env.MANGO_URI); 

        // If the connection is successful, a message is logged to the console indicating that MongoDB is connected.
        console.log('MongoDB connected'); 

    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

// Exporting the connectDB function so that it can be imported and used in other parts of the application, 
// such as the main server file (e.g., app.js or server.js) to establish a connection to the database when the application starts.
module.exports = connectDB; 

//This file is responsible for connecting to the MongoDB database using Mongoose. 
// It defines an asynchronous function connectDB that attempts to connect to the database using the connection string stored 
// in the environment variable MANGO_URI. If the connection is successful, it logs a success message; if it fails, it logs an 
// error message and exits the process. The function is then exported for use in other parts of the application.