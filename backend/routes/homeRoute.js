const express = require('express');

const router = express.Router();

const myProducts = require('../models/products.models');

router.get('/', async (req, res) => {
    try {
        const products = await myProducts.find();
        res.render('home', { products });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Error fetching products");
    }
});

router.get('/search', async (req, res) => {
    const searchQuery = req.query.q?.trim();
    console.log("Search Query:", searchQuery);

    try {
        let products;

        if (searchQuery) {
            const regex = new RegExp(searchQuery, 'i');
            products = await myProducts.find({
                $or: [
                    { name: regex },
                    { category: regex }
                ]
            });

            // console.log("Products:", products);

            if (products.length === 0) {
                return res.send("No products found for query: " + searchQuery);
            }

            res.render('home', { products, fname: req.session.userFname });
        } else {
            res.send("Search query cannot be empty.");
        }
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Error fetching products");
    }
});

router.get('/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await myProducts.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render('homeSingleProduct', { product });
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).send('Error fetching product details');
    }
});

module.exports = router;