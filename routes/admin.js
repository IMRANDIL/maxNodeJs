const express = require('express');
// const path = require('path');
const router = express.Router();
const postprod = require('../controllers/admin');
const getproducs = require('../controllers/admin')
// const routeDir = require('../util/path')




router.get('/add-product', getproducs.getProducts);

router.get('/admin-products', getproducs.getAdminProduct)

router.get('/edit-product/:productId', getproducs.getEditProducts)

router.post('/add-product', postprod.postProduct)

router.post('/edit-product', postprod.postEdit);

module.exports = { router };