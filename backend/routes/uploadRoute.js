const express = require('express');

const path = require('path');

const router = express.Router();


const myProducts = require('../models/products.models');

const { isAuthenticatedUser, isAuthenticatedVendor } = require('../middlewares/authMiddleware');

router.get('/', isAuthenticatedVendor, (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/upload.html'));
});

router.post('/', isAuthenticatedVendor, async (req, res) => {
    const { name, description, price, category } = req.body;
    
    try {
        const product = new myProducts({ name, description, price, category });
        await product.save();
        res.redirect('/admin');
    } catch (err) {
        console.error("Error saving product:", err);
        res.status(500).json({ message: 'Failed to upload product' });
    }
});

module.exports = router;