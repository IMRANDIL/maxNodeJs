// const { product } = require('../routes/admin');
// const products = [];

const Product = require('../modals/product');
const Cart = require('../modals/cart')


exports.getProduct = (req, res) => {

    Product.findAll().then((rows) => {
        res.render('shop/shop', { rows, title: 'All Products', path: req.url, hasProducts: rows.length > 0 });
    }).catch((err) => console.log(err));

}

exports.getSpecId = (req, res, next) => {
    const prodId = req.params.prodId;
    Product.findByPk(prodId).then((rows) => {
        // console.log(rows);
        res.render('shop/product-detail', {
            rows, title: rows.title, path: '/products'
        })
    }).catch(err => console.log(err))

}








exports.getIndex = (req, res, next) => {
    Product.findAll().then((rows) => {
        // console.log(rows.dataValues);
        res.render('shop/index', { rows, title: 'The Shop', path: req.url, hasProducts: rows.length > 0 });
    }).catch((err) => console.log(err));

}


exports.getCart = (req, res, next) => {


    req.Specuser.getCart().then((cart) => {
        return cart.getProduct().then((cartProducts) => {
            res.render('shop/cart', { cartProducts, path: req.url, title: 'The_Cart' })
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))


}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findbyId(prodId, (product) => {
        Cart.addProduct(prodId, product.price)
    })
    res.redirect('/cart')

}


exports.deleteCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findbyId(prodId, product => {
        Cart.deleteProduct(prodId, product.price);

    })
    return res.redirect('/cart')
}


exports.getCheckOut = (req, res, next) => {
    res.render('shop/checkout', { path: req.url, title: 'The_CheckOut' })
}


exports.getOrder = (req, res, next) => {
    res.render('shop/orders', { path: req.url, title: 'The Orders' })
}