const express = require('express');
const routeDir = require('../util/path')
const router = express.Router();
const path = require('path');
const { product } = require('../routes/admin')
router.get('/', (req, res) => {
    const products = [...product];
    console.log(products);
    res.render('shop', { products, title: 'The Shop', path: '/', hasProducts: products.length > 0 })
})


module.exports = router;