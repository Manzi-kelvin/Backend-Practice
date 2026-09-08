const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Check if email or phone already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists.",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: role || "customer",
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
exports.login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    // Login with email OR phone
    const user = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (!user) {
      return res.status(404).json({
        message: "Invalid credentials.",
      });
    }

    // Compare password
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

// ================= GET PROFILE =================
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.status(200).json({
      message: "Profile retrieved successfully.",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};