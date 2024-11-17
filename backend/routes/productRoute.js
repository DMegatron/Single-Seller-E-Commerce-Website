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



module.exports = router;