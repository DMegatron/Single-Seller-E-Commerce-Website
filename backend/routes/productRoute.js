const express = require('express');

const router = express.Router();

const myProducts = require('../models/products.models');

router.get('/', async (req, res) => {
    try {
        const products = await myProducts.find();
        res.render('viewProducts', { products });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Error fetching products");
    }
});

module.exports = router;