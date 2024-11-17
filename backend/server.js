const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');
env.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3000;
app.set('view engine', 'hbs');
const loginRoute = require('./routes/loginRoute');
const signupRoute = require('./routes/signupRoute');
const myProductsRoute = require('./routes/myProductsRoute');
const uploadRoute = require('./routes/uploadRoute');
const vendorLoginRoute = require('./routes/vendorLoginRoute'); 
const vendorSignupRoute = require('./routes/vendorSignupRoute');
const productRoute = require('./routes/productRoute');
mongoose.connect(process.env.MONGODB_URI)
    .then(() => { 
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB");
        console.error(err); 
    });

 

app.use('/login', loginRoute); 

app.use('/signup', signupRoute); 

app.use('/myProducts', myProductsRoute);

app.use('/upload', uploadRoute);

app.use('/vendorLogin', vendorLoginRoute);

app.use('/vendorSignup', vendorSignupRoute);

app.use('/productRoute', productRoute);

app.get('/admin', (req, res) => {
    res.render('admin', { fname: global.fname });
});

app.get('/test', (req, res) => {
    res.render('test');
});

