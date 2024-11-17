const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const User = mongoose.model('User', usersSchema);

module.exports = User;  // Ensure Product is being exported correctly
