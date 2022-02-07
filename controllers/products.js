// const { product } = require('../routes/admin');
// const products = [];

const Product = require('../modals/product');




exports.getProduct = (req, res) => {

    Product.fetchAll().then((rows) => {
        res.render('shop/shop', { rows, title: 'All Products', path: req.url, hasProducts: rows.length > 0 });
    }).catch((err) => console.log(err));

}

exports.getSpecId = (req, res, next) => {
    const prodId = req.params.prodId;
    Product.findById(prodId).then((rows) => {
        // console.log(rows);
        res.render('shop/product-detail', {
            rows, title: rows.title, path: '/products'
        })
    }).catch(err => console.log(err))

}








exports.getIndex = (req, res, next) => {
    Product.fetchAll().then((rows) => {
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

    Product.findById(prodId).then((product) => {
        return req.Specuser.addToCart(product)
    }).then((result) => {
        console.log(result)
    })

















    // let fetchedCart;
    // let newQuantity = 1;
    // req.Specuser.getCart().then((cart) => {
    //     fetchedCart = cart;
    //     return cart.getProducts({ where: { id: prodId } }).then((products) => {
    //         let product;
    //         if (products.length > 0) {
    //             product = products[0]
    //         }


    //         if (product) {
    //             //....adding existing item to the cart..
    //             const oldQuantity = product.cartItem.quantity;
    //             newQuantity = oldQuantity + 1;
    //             return product;

    //         }

    //         return Product.findByPk(prodId)

    //     }).then((product) => {
    //         return fetchedCart.addProduct(product, { through: { quantity: newQuantity } })
    //     })
    //         .then(() => {
    //             res.redirect('/cart')
    //         })
    // }).catch(err => console.log(err))

}



exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.Specuser.getCart().then((cart) => {
        fetchedCart = cart;
        return cart.getProducts()
    }).then((products) => {
        return req.Specuser.createOrder().then((order) => {
            return order.addProducts(products.map((product) => {
                product.orderItem = { quantity: product.cartItem.quantity }
                return product;
            }))
        }).catch(err => console.log(err));
    }).then((result) => {
        return fetchedCart.setProducts(null)

    }).then((result) => {
        res.redirect('/orders')
    })
        .catch((err) => console.log(err))
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





exports.getOrder = (req, res, next) => {
    req.Specuser.getOrders({ include: ['products'] }).then((orders) => {
        console.log(orders);
        res.render('shop/orders', { path: req.url, title: 'The Orders', orders: orders })
    }).catch(err => console.log(err))

}