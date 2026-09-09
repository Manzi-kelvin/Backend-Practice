const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id, role) => {
  //jwt.sign is a function from the JWT library that creates a secure token.
  return jwt.sign(
    { id, role }, // It stores information inside the token. id, role
    process.env.JWT_SECRET, //This is the secret password only the server knows.Only someone with the secret key can check that the seal is real.
    { expiresIn: "7d" }
  );
};

// ================= REGISTER =================
// 1 User sends registration information.
// 2	Server checks if that user already exists.
// 3	Password is locked (hashed).
// 4	New user is saved in MongoDB.
// 5	Server creates a JWT login token.
// 6	Server sends the token and user information back.

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Check if email or phone already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }], //$or means:Find someone whose email matches OR phone matches.
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists.",
      });
    }

    // Hash password
    //Imagine two people both choose: "password123" as their password. If we store the password as is, 
    // both users will have the same password in the database. This is a security risk because if one user's 
    // password is compromised, the other user's account is also at risk. To prevent this, we use a technique 
    // called "salting" to add a unique random string (salt) to each user's password before hashing it. 
    // This way, even if two users have the same password, their hashed passwords will be different due to 
    // the unique salt.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "customer", // for security reasons.
    });

    res.status(201).json({
      message: "Registration successful.",
      token: generateToken(user._id, user.role),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= LOGIN =================
// 1	User sends email/phone and password.
// 2	Server searches MongoDB for that user.
// 3	Server compares the password with the hashed password.
// 4	If they match, server creates a JWT token.
// 5	Server sends the token and user information back.
exports.login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    // Find the user in MongoDB
    const user = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (!user) {
      return res.status(404).json({
        message: "Invalid credentials.",
      });
    }

    // Compare password
    // Does bcrypt decrypt it? No.
    // Instead it hashes the typed password again and checks whether the result matches.
    // Imagine a fingerprint scanner, User places finger. Scanner compares fingerprints. It doesn't recreate 
    // the original finger. bcrypt works similarly.

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }

    res.status(200).json({
      message: "Login successful.",
      token: generateToken(user._id, user.role),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
