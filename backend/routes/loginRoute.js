const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const path = require('path');

const User = require('../models/users.models');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/login.html'));
})

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user in the database
        const user = await User.findOne({ email });

        if (user) {
            if (user.password === password) {
                req.session.userEmail = user.email;
                req.session.userFname = user.fname;
                res.redirect('/productRoute');
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