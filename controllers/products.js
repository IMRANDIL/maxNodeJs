// // const { product } = require('../routes/admin');
// // const products = [];

const Product = require('../modals/product');

const Order = require('../modals/order')




exports.getProduct = (req, res) => {

    Product.find({}).then((rows) => {
        res.render('shop/shop', { rows, title: 'All Products', path: req.url, hasProducts: rows.length > 0, isAuthenticated: req.session.isLoggedIn });
    }).catch((err) => console.log(err));

}

exports.getSpecId = (req, res, next) => {
    const prodId = req.params.prodId;
    Product.findById(prodId).then((rows) => {
        // console.log(rows);
        res.render('shop/product-detail', {
            rows, title: rows.title, path: '/products',
            isAuthenticated: req.session.isLoggedIn
        })
    }).catch(err => console.log(err))

}








exports.getIndex = (req, res, next) => {
    Product.find({}).then((rows) => {
        // console.log(rows.dataValues);
        res.render('shop/index', { rows, title: 'The Shop', path: req.url, hasProducts: rows.length > 0 });
    }).catch((err) => console.log(err));

}


exports.getCart = (req, res, next) => {


    req.user.populate('cart.items.productId').then((user) => {
        // console.log(user.cart.items);
        const cartProducts = user.cart.items;
        // console.log(cartProducts);
        res.render('shop/cart', { cartProducts, path: req.url, title: 'The_Cart', isAuthenticated: req.session.isLoggedIn })

    }).catch(err => console.log(err))


}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;

    Product.findById(prodId).then((product) => {
        return req.user.addToCart(product)

    }).then((result) => {
        // console.log(result)
        res.redirect('/cart')
    })

}



exports.postOrder = (req, res, next) => {

    req.user.populate('cart.items.productId').then((user) => {

        // console.log(user.cart.items);
        const cartProducts = user.cart.items.map((item) => {
            return { quantity: item.quantity, product: { ...item.productId._doc } };
        })


        const order = new Order({
            user: {
                email: req.user.email,
                userId: req.user
            },
            products: cartProducts
        });

        return order.save()


    })
        .then((result) => {
            return req.user.clearCart()

        }).then(() => {
            res.redirect('/orders')
        })

        .catch((err) => console.log(err))
}









exports.deleteCart = (req, res, next) => {

    const prodId = req.body.productId;
    // console.log(prodId);
    req.user.deleteItem(prodId).then((result) => {
        return res.redirect('/cart')
    })
        .catch((err) => console.log(err))

}





exports.getOrder = (req, res, next) => {

    Order.find({ 'user.userId': req.user._id }).then((orders) => {
        // console.log(orders);
        res.render('shop/orders', { path: req.url, title: 'The Orders', orders: orders, isAuthenticated: req.session.isLoggedIn })
    }).catch(err => console.log(err))

}