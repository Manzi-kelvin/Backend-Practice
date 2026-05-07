// // Importing the jsonwebtoken library, which is used for creating and verifying JSON Web Tokens (JWTs). 
// // JWTs are a compact, URL-safe means of representing claims to be transferred between two parties. 
// // They are commonly used for authentication and authorization in web applications.
// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//     try {
//         // reading the token from the Authorization header
//         const authHeader = req.header('Authorization');

//         // checking if the token is provided
//         if (!authHeader) {
//             return res.status(401).json({ message: "No token provided" });
//         }

//         // authHeader.split(' ') is used to split the Authorization header into parts, for. 
//         // The expected format of the header is "Bearer <
//         const parts = authHeader.split(' ');

//         //this if statement checks if the token is in the correct format, which should be "Bearer <

//         if (parts.length !== 2 || parts[0] !== 'Bearer') {
//             return res.status(401).json({ message: "invalid Token error" });
//         }

//         const token = parts[1]; // this line extracts the actual token from the Authorization header, which is the second part after splitting by space.

//         // verifying the token, "decoded" variable
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // jwt.verify(a,b) means that it takes the token and the secret key to verify the token's authenticity. If the token is valid, it returns the decoded payload; otherwise, it throws an error.

//         req.user = decoded; // attaching the decoded token to the request object for further use
//         next(); // calling the next middleware or route handler, it is important because

//     } catch (error) {
//         res.status(401).json({ message: "Authentication failed!", error: error.message });
//     }
// };

// // This file is all about creating a middleware function for authentication using JWTs. 
// // The middleware reads the token from the Authorization header of the incoming request, 
// // checks if it is provided and in the correct format, and then verifies the token using the secret key. 
// // If the token is valid, it attaches the decoded token to the request object and calls the next middleware or route handler. 
// // If any step fails, it responds with a 401 status code and an appropriate error message.

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 🔐 Protect routes (verify token)
const protect = async (req, res, next) => {
    let token;

    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user (exclude password)
            req.user = await User.findById(decoded.id).select('-password');

            next();

        } catch (error) {
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

module.exports = { protect };