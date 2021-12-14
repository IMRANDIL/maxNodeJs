const express = require('express');
// const path = require('path');
const router = express.Router();
const postprod = require('../controllers/products');
const getproducs = require('../controllers/products')
// const routeDir = require('../util/path')




router.get('/add-product', getproducs.getProducts)


router.post('/add-product', postprod.postProduct)



module.exports = { router };