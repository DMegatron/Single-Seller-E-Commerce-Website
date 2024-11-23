const express = require('express');
const router = express.Router();
const Cart = require('../models/cart.models');
const { isAuthenticatedUser } = require('../middlewares/authMiddleware');

// Route to add a product to the cart
router.post('/add/:id', isAuthenticatedUser, async (req, res) => {
    const productId = req.params.id;
    const quantity = parseInt(req.body.quantity, 10); // Convert to a number
    const email = req.session.userEmail;

    console.log("quantity:", quantity);

    if (isNaN(quantity) || quantity <= 0) {
        return res.status(400).send("Invalid quantity. Please provide a valid positive number.");
    }

    try {
        let cart = await Cart.findOne({ email });

        if (!cart) {
            cart = new Cart({ email, products: [] });
        }

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity; // Add the numeric quantity
        } else {
            cart.products.push({ productId, quantity }); // Add new product with numeric quantity
        }

        await cart.save();
        res.redirect('/productRoute');
    } catch (err) {
        console.error("Error adding product to cart:", err);
        res.status(500).send("Error adding product to cart");
    }
});


// Route to view the cart
router.get('/', isAuthenticatedUser, async (req, res) => {
    const email = req.session.userEmail;

    try {
        const cart = await Cart.findOne({ email }).populate('products.productId');

        if (!cart || cart.products.length === 0) {
            return res.render('cart', { 
                products: [], 
                fname: req.session.userFname, 
                totalAmount: 0 
            });
        }

        // Filter out items with null productId
        const validProducts = cart.products.filter(item => item.productId);

        // Calculate the total amount
        const totalAmount = validProducts.reduce((total, item) => {
            return total + item.productId.price * item.quantity;
        }, 0);

        res.render('cart', { 
            products: validProducts, 
            fname: req.session.userFname, 
            totalAmount 
        });
    } catch (err) {
        console.error("Error fetching cart:", err);
        res.status(500).send("Error fetching cart");
    }
});




// Route to remove a product from the cart
router.post('/remove/:id', isAuthenticatedUser, async (req, res) => {
    const productId = req.params.id;
    const email = req.session.userEmail;

    try {
        const cart = await Cart.findOne({ email });

        if (!cart) {
            return res.redirect('/cart');
        }

        cart.products = cart.products.filter(p => p.productId.toString() !== productId);

        await cart.save();
        res.redirect('/cart');
    } catch (err) {
        console.error("Error removing product from cart:", err);
        res.status(500).send("Error removing product from cart");
    }
});

module.exports = router;