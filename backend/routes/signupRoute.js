const express = require('express');
// const app = express();
const router = express.Router();

const mongoose = require('mongoose');

const path = require('path');

const User = require('../models/users.models');

// mongoose.connect("mongodb://127.0.0.1:27017/ecom")
//     .then(() => {
//         console.log("Connected to MongoDB");
//     })
//     .catch((err) => {
//         console.log("Error connecting to MongoDB");
//         console.error(err); 
//     });
 
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/signup.html'));
})

router.post('/', async (req, res) => {
    const { fname, lname, email, password } = req.body;
    
    try {
        const user = new User({ fname, lname, email, password });
        await user.save();
        res.redirect('/productRoute');
    } catch (err) {
        console.error("Error saving product:", err);
        res.status(500).json({ message: 'Failed to upload product' });
    }
});

module.exports = router;