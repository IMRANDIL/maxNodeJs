const express = require('express');

const router = express.Router();
const getprod = require('../controllers/products');
const isAuth = require('../middleware/is-auth')
// const path = require('path');
// const { product } = require('../routes/admin');


router.get('/', getprod.getIndex);
router.get('/products', getprod.getProduct);
router.get('/products/:prodId', getprod.getSpecId)
router.get('/cart', isAuth, getprod.getCart);
router.post('/cart-delete', isAuth, getprod.deleteCart)
router.post('/cart', isAuth, getprod.postCart)

router.get('/orders', isAuth, getprod.getOrder);
router.post('/create-order', isAuth, getprod.postOrder)


module.exports = router;