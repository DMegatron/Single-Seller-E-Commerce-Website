const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const Product = mongoose.model('Product', productsSchema);

module.exports = Product;  // Ensure Product is being exported correctly
