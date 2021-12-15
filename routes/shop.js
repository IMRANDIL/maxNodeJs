const express = require('express');

const router = express.Router();
const getprod = require('../controllers/products')
// const path = require('path');
// const { product } = require('../routes/admin');


router.get('/', getprod.getProduct)


module.exports = router;