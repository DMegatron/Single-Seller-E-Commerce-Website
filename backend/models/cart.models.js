// models/cart.models.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    email: {
        type: String,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;