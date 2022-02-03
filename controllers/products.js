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
        return cart.getProducts().then((cartProducts) => {
            res.render('shop/cart', { cartProducts, path: req.url, title: 'The_Cart' })
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))


}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.Specuser.getCart().then((cart) => {
        fetchedCart = cart;
        return cart.getProducts({ where: { id: prodId } }).then((products) => {
            let product;
            if (products.length > 0) {
                product = products[0]
            }


            if (product) {
                //....adding existing item to the cart..
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;

            }

            return Product.findByPk(prodId)

        }).then((product) => {
            return fetchedCart.addProduct(product, { through: { quantity: newQuantity } })
        })
            .then(() => {
                res.redirect('/cart')
            })
    }).catch(err => console.log(err))

}


exports.deleteCart = (req, res, next) => {
    const prodId = req.body.productId;
    req.Specuser.getCart().then((cart) => {
        return cart.getProducts({ where: { id: prodId } })
    }).then((products) => {
        const product = products[0];
        return product.cartItem.destroy()
    }).then((result) => {
        return res.redirect('/cart')
    })
        .catch((err) => console.log(err))

}


exports.getCheckOut = (req, res, next) => {
    res.render('shop/checkout', { path: req.url, title: 'The_CheckOut' })
}


exports.getOrder = (req, res, next) => {
    res.render('shop/orders', { path: req.url, title: 'The Orders' })
}