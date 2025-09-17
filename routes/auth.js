const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

// Sample login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        if (admin.password !== password) return res.status(401).json({ message: 'Incorrect password' });

        res.json({ message: 'Login successful', admin });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
