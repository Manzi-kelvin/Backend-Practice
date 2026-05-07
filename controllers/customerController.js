const Customer = require('../models/Customer');
const bcrypt = require('bcryptjs');

// 🟢 Create Customer
exports.createCustomer = async (req, res) => {
    try {
        const { name, email, address } = req.body;

        // const hashedPassword = await bcrypt.hash(password, 10);

        const customer = await Customer.create({
            name,
            email,
            address
        });

        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔵 Get All Customers
exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🟡 Update Customer
exports.updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete customer
exports.deleteCustomer = async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.json({ message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
