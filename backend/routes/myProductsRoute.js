const express = require('express');
const router = express.Router();
const myProducts = require('../models/products.models');
const { isAuthenticatedUser, isAuthenticatedVendor } = require('../middlewares/authMiddleware');


// Route to render the products page
router.get('/', isAuthenticatedVendor, async (req, res) => {
    try {
        const products = await myProducts.find();
        res.render('products', { products });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Error fetching products");
    }
});

// Route to render the update form
router.get('/update/:id', isAuthenticatedVendor, async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await myProducts.findById(productId);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.render('updateProduct', { product });
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).send("Error fetching product");
    }
});

// Route to handle the update form submission
router.post('/update/:id', isAuthenticatedVendor, async (req, res) => {
    const productId = req.params.id;
    const { name, description, price, category } = req.body;

    try {
        const updatedProduct = await myProducts.findByIdAndUpdate(
            productId, 
            { name, description, price, category },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).send("Product not found");
        }
        res.redirect('/myProducts');
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).send("Error updating product");
    }
});

// Route to handle product deletion
router.delete('/delete/:id', isAuthenticatedVendor, async (req, res) => {
    const productId = req.params.id;

    try {
        const deletedProduct = await myProducts.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).send("Product not found");
        }
        res.redirect('/myProducts');
    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).send("Error deleting product");
    }
});

module.exports = router;