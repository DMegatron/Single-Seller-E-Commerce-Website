const express = require('express');
const router = express.Router();
const myProducts = require('../models/products.models');
const { isAuthenticatedUser, isAuthenticatedVendor } = require('../middlewares/authMiddleware');


// Route to render the products page
router.get('/', isAuthenticatedVendor, async (req, res) => {
    try {
        // Assuming vendorEmail is stored in req.session
        const owner = req.session.vendorEmail;

        // Fetch products belonging to the vendor
        const products = await myProducts.find({ owner });

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
    const { name, description, category } = req.body;

    // Convert price to a number
    const price = parseFloat(req.body.price);

    // Validate price input
    if (isNaN(price)) {
        return res.status(400).send("Invalid price. Price must be a valid number.");
    }

    try {
        const updatedProduct = await myProducts.findByIdAndUpdate(
            productId,
            { name, description, price, category },
            { new: true } // Returns the updated document
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
router.get('/delete/:id', isAuthenticatedVendor, async (req, res) => {
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

router.get('/:id', isAuthenticatedVendor, async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await myProducts.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render('vendorSingleProduct', { product });
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).send('Error fetching product details');
    }
});

module.exports = router;