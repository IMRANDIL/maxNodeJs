// // const { product } = require('../routes/admin');
// // const products = [];

// const Product = require('../modals/product');




// exports.getProduct = (req, res) => {

//     Product.fetchAll().then((rows) => {
//         res.render('shop/shop', { rows, title: 'All Products', path: req.url, hasProducts: rows.length > 0 });
//     }).catch((err) => console.log(err));

// }

// exports.getSpecId = (req, res, next) => {
//     const prodId = req.params.prodId;
//     Product.findById(prodId).then((rows) => {
//         // console.log(rows);
//         res.render('shop/product-detail', {
//             rows, title: rows.title, path: '/products'
//         })
//     }).catch(err => console.log(err))

// }








// exports.getIndex = (req, res, next) => {
//     Product.fetchAll().then((rows) => {
//         // console.log(rows.dataValues);
//         res.render('shop/index', { rows, title: 'The Shop', path: req.url, hasProducts: rows.length > 0 });
//     }).catch((err) => console.log(err));

// }


// exports.getCart = (req, res, next) => {


//     req.Specuser.getCart().then((cartProducts) => {
//         console.log(cartProducts)
//         res.render('shop/cart', { cartProducts, path: req.url, title: 'The_Cart' })

//     }).catch(err => console.log(err))


// }

// exports.postCart = (req, res, next) => {
//     const prodId = req.body.productId;

//     Product.findById(prodId).then((product) => {
//         return req.Specuser.addToCart(product)

//     }).then((result) => {
//         console.log(result)
//         res.redirect('/cart')
//     })

// }



// exports.postOrder = (req, res, next) => {
//     let fetchedCart;
//     req.Specuser.addOrder()
//         .then((result) => {
//             res.redirect('/orders')
//         })
//         .catch((err) => console.log(err))
// }









// exports.deleteCart = (req, res, next) => {
//     const prodId = req.body.productId;
//     req.Specuser.deleteItem(prodId).

//         then((result) => {
//             return res.redirect('/cart')
//         })
//         .catch((err) => console.log(err))

// }





// exports.getOrder = (req, res, next) => {
//     req.Specuser.getOrders().then((orders) => {
//         console.log(orders);
//         res.render('shop/orders', { path: req.url, title: 'The Orders', orders: orders })
//     }).catch(err => console.log(err))

// }