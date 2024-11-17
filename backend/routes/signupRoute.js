const express = require('express');
// const app = express();
const router = express.Router();

const mongoose = require('mongoose');

const path = require('path');

const User = require('../models/users.models');


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/signup.html'));
})

router.post('/', async (req, res) => {
    const { fname, lname, email, password } = req.body;
    
    try {
        const user = new User({ fname, lname, email, password });
        await user.save();
        req.session.userEmail = user.email;
        req.session.userFname = user.fname;
        res.redirect('/productRoute');
    } catch (err) {
        console.error("Error saving product:", err);
        res.status(500).json({ message: 'Failed to upload product' });
    }
});

module.exports = router;