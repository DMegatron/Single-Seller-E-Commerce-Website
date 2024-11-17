const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const path = require('path');

const Vendor = require('../models/vendors.models');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/vendorLogin.html'));
})

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user in the database
        const vendor = await Vendor.findOne({ email });

        if (vendor) {
            if (vendor.password === password) {
                global.fname = vendor.fname;
                res.render('admin', { fname: vendor.fname });
            } else {
                res.send("Login failed! Incorrect password.");
            }
        } else {
            res.send("Login failed! User not found.");
        }
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).send("An error occurred. Please try again later.");
    }
});

module.exports = router;