const express = require('express');

const router = express.Router();

const myProducts = require('../models/products.models');

const { isAuthenticatedUser, isAuthenticatedVendor } = require('../middlewares/authMiddleware');

router.get('/', isAuthenticatedUser, async (req, res) => {
    try {
        const products = await myProducts.find();
        res.render('viewProducts', { products, fname: req.session.userFname });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Error fetching products");
    }
});

router.get('/search', isAuthenticatedUser, async (req, res) => {
    const searchQuery = req.query.query?.trim(); // Extract and trim the search query
    console.log("Search Query:", searchQuery);

    try {
        let products;

        if (searchQuery) {
            // Search for products by name or category with direct comparison
            products = await myProducts.find({
                $or: [
                    { name: searchQuery },
                    { category: searchQuery }
                ]
            });

            if (products.length === 0) {
                return res.send("No products found for query: " + searchQuery);
            }

            res.render('viewProducts', { products, fname: req.session.userFname });
        } else {
            res.send("Search query cannot be empty.");
        }
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Error fetching products");
    }
});





router.get('/:id', isAuthenticatedUser, async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await myProducts.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render('singleProduct', { product });
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).send('Error fetching product details');
    }
});



module.exports = router;