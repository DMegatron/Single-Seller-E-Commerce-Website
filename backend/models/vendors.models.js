const mongoose = require('mongoose');

const vendorsSchema = new mongoose.Schema({
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
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const Vendor = mongoose.model('Vendor', vendorsSchema);

module.exports = Vendor;  // Ensure Product is being exported correctly
