const express = require('express');
// const app = express();
const router = express.Router();

const path = require('path');

const Vendor = require('../models/vendors.models');


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/vendorSignup.html'));
})

router.post('/', async (req, res) => {
    const { fname, lname, email, password } = req.body;
    
    try {
        const vendor = new Vendor({ fname, lname, email, password });
        await vendor.save();
        global.fname = user.fname;
        res.redirect('/admin');
    } catch (err) {
        console.error("Error saving product:", err);
        res.status(500).json({ message: 'Failed to upload product' });
    }
});

module.exports = router;