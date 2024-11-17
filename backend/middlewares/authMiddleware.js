function isAuthenticatedUser(req, res, next) {
    if (req.session && req.session.userEmail) {
        return next();
    } else {
        res.redirect('/login');
    }
}

function isAuthenticatedVendor(req, res, next) {
    if (req.session && req.session.vendorEmail) {
        return next();
    } else {
        res.redirect('/vendorLogin');
    }
}

module.exports = {
    isAuthenticatedUser,
    isAuthenticatedVendor
};