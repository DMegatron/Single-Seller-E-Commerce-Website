const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');
const session = require('express-session');
env.config();
const app = express();
const hbs = require('hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


const PORT = process.env.PORT || 3000;
app.set('view engine', 'hbs');
hbs.registerHelper('truncate', function(str, length) {
    if (str && str.length > length) {
      return str.substring(0, length) + '...';
    }
    return str;
  });
const loginRoute = require('./routes/loginRoute');
const signupRoute = require('./routes/signupRoute');
const myProductsRoute = require('./routes/myProductsRoute');
const uploadRoute = require('./routes/uploadRoute');
const vendorLoginRoute = require('./routes/vendorLoginRoute'); 
const vendorSignupRoute = require('./routes/vendorSignupRoute');
const productRoute = require('./routes/productRoute');
const homeRoute = require('./routes/homeRoute');
const cartRoute = require('./routes/cartRoute');
// const checkoutRoute = require('./routes/checkoutRoute');
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

app.use('/home', homeRoute);

app.use('/login', loginRoute); 

app.use('/signup', signupRoute); 

app.use('/myProducts', myProductsRoute);

app.use('/upload', uploadRoute);

app.use('/vendorLogin', vendorLoginRoute);

app.use('/vendorSignup', vendorSignupRoute);

app.use('/productRoute', productRoute); 

app.use('/cart', cartRoute);

// app.use('/checkout', checkoutRoute);

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/home');
});

app.get('/admin', (req, res) => {
    if(!req.session.vendorEmail) {
        return res.redirect('/vendorLogin');
    }
    res.render('admin', { fname: req.session.vendorFname });
});


