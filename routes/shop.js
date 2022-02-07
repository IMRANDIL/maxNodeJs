const express = require('express');

const router = express.Router();
const getprod = require('../controllers/products')
// const path = require('path');
// const { product } = require('../routes/admin');


router.get('/', getprod.getIndex);
router.get('/products', getprod.getProduct);
router.get('/products/:prodId', getprod.getSpecId)
// router.get('/cart', getprod.getCart);
// router.post('/cart-delete', getprod.deleteCart)
router.post('/cart', getprod.postCart)

// router.get('/orders', getprod.getOrder);
// router.post('/create-order', getprod.postOrder)


module.exports = router;