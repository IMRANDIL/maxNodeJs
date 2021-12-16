// const { product } = require('../routes/admin');
// const products = [];

const Product = require('../modals/product')


exports.getProduct = (req, res) => {

    Product.fetchAll((product) => {
        const products = [...product]
        console.log(product);

        res.render('shop/shop', { products, title: 'All Products', path: req.url, hasProducts: products.length > 0 });
    });

}


exports.getIndex = (req, res, next) => {
    Product.fetchAll((product) => {
        const products = [...product]
        console.log(product);

        res.render('shop/index', { products, title: 'The Shop', path: req.url, hasProducts: products.length > 0 });
    });
}


exports.getCart = (req, res, next) => {
    res.render('shop/cart', { path: req.url, title: 'The_Cart' })
}


exports.getCheckOut = (req, res, next) => {
    res.render('shop/checkout', { path: req.url, title: 'The_CheckOut' })
}


exports.getOrder = (req, res, next) => {
    res.render('shop/orders', { path: req.url, title: 'The Orders' })
}