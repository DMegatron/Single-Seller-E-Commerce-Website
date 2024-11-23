// const express = require('express');
// const router = express.Router();
// const { isAuthenticatedUser } = require('../middlewares/authMiddleware');
// const Cart = require('../models/cart.models');
// const Product = require('../models/products.models');

// router.get('/buy', isAuthenticatedUser, async (req, res) => {
//     const email = req.session.userEmail;  // Use the email if you're not using userId

//     try {
//         // Find the user's cart and populate the productId
//         const cart = await Cart.findOne({ email }).populate('products.productId');

//         if (!cart || cart.products.quantity === 0) {
//             return res.status(400).send("Cart is empty");
//         }

//         // Reduce the quantity of each product in the products collection
//         for (const item of cart.products) {
//             const product = item.productId;

//             // Check if the product exists after population
//             if (!product) {
//                 return res.status(400).send(`Product not found for one of the items in the cart.`);
//             }

//             // Check if there is enough stock available
//             if (product.quantity < item.quantity) {
//                 return res.status(400).send(`Not enough stock for product: ${product.name}`);
//             }

//             // Update product quantity in the database
//             product.quantity -= item.quantity;
//             await product.save();
//         }

//         // Clear the user's cart after successful purchase
//         cart.products = [];
//         await cart.save();

//         res.send("Checkout successful");
//     } catch (err) {
//         console.error("Error during checkout:", err);
//         res.status(500).send("Error during checkout");
//     }
// });


// module.exports = router;