// const { product } = require('../routes/admin');
// const products = [];

const Product = require('../modals/product');
const Cart = require('../modals/cart')


exports.getProduct = (req, res) => {

    Product.fetchAll((product) => {
        const products = [...product]
        // console.log(product);

        res.render('shop/shop', { products, title: 'All Products', path: req.url, hasProducts: products.length > 0 });
    });

}

exports.getSpecId = (req, res, next) => {
    const prodId = req.params.prodId;
    Product.findbyId(prodId, (product) => {
        res.render('shop/product-detail', {
            product, title: product.title, path: '/products'
        })
    })

}








exports.getIndex = (req, res, next) => {
    Product.fetchAll((product) => {
        const products = [...product]
        // console.log(product);

        res.render('shop/index', { products, title: 'The Shop', path: req.url, hasProducts: products.length > 0 });
    });
}


exports.getCart = (req, res, next) => {
    Cart.getCart((cart) => {
        Product.fetchAll((products) => {
            const cartProducts = [];
            for (product of products) {
                const cartProductsData = cart.products.find(prod => prod.id === product.id)
                if (cartProductsData) {
                    cartProducts.push({ productData: product, qty: cartProductsData.qty });
                }
            }
            res.render('shop/cart', { cartProducts, path: req.url, title: 'The_Cart' })
        })

    })

}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findbyId(prodId, (product) => {
        Cart.addProduct(prodId, product.price)
    })
    res.redirect('/cart')

}



exports.getCheckOut = (req, res, next) => {
    res.render('shop/checkout', { path: req.url, title: 'The_CheckOut' })
}


exports.getOrder = (req, res, next) => {
    res.render('shop/orders', { path: req.url, title: 'The Orders' })
}