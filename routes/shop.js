const express = require('express');

const router = express.Router();
const getprod = require('../controllers/products')
// const path = require('path');
// const { product } = require('../routes/admin');


router.get('/', getprod.getIndex);
router.get('/products', getprod.getProduct);
router.get('/products/:prodId', getprod.getSpecId)
router.get('/cart', getprod.getCart);
router.get('/checkout', getprod.getCheckOut);
router.get('/orders', getprod.getOrder);


module.exports = router;