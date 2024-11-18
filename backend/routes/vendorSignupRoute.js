const express = require('express');
// const app = express();
const router = express.Router();

const path = require('path');

const Vendor = require('../models/vendors.models');


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/vendorSignup.html'));
})

router.post('/', async (req, res) => {
    const { fname, lname, email, password, confirmPassword } = req.body;

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match. Please try again.");
    }

    try {
        const user = new User({ fname, lname, email, password });
        await user.save();
        req.session.userEmail = user.email;
        req.session.userFname = user.fname;
        res.redirect('/productRoute');
    } catch (err) {
        console.error("Error saving user:", err);
        res.status(500).send("Unable to Sign Up! Please try again later.");
    }
});


module.exports = router;