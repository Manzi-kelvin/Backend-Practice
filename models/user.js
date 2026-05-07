// Importing the Mongoose library, which is an Object Data Modeling (ODM) tool for MongoDB and Node.js. 
// It provides a schema-based solution to model application data and includes built-in type casting, validation, 
// query building, and business logic hooks.
const mongoose = require('mongoose');

// Defining the user schema using Mongoose
// new mongoose.Schema means we are creating a new schema for the User model. 
// A schema in Mongoose defines the structure of the documents within a collection, including the fields, their types, 
// and any validation rules or constraints. In this case, we are defining a schema for users that includes fields for name, email,
// and password, along with their respective data types and validation requirements.

const userSchema = new mongoose.Schema(
    {
        // Defining the fields for the user schema
        name: {
            type: String,
            required: true,
            trim: true
        },
        // The email field is defined as a string that is required, must be unique, will be stored in lowercase, 
        // and will have whitespace trimmed. This ensures that each user has a unique email address and that the email is 
        // stored in a consistent format.
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        // The password field is defined as a string that is required and must have a minimum length of 6 characters. 
        // This ensures that users provide a password that meets basic security requirements.
        password: {
            type: String,
            required: true,
            minlength: 6
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('user', userSchema);

//This file is responsible for defining the User model using Mongoose.
// It creates a schema that outlines the structure of user documents in the MongoDB database, including fields for name, email,
// and password, along with their respective validation rules. The schema also includes timestamps to automatically track when
// each user document is created and last updated. Finally, the User model is exported for use in other parts of the application,
// such as in route handlers or controllers where user  data needs to be accessed or manipulated.