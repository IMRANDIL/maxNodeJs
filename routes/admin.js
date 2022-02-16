const express = require('express');
// const path = require('path');
const router = express.Router();
const postprod = require('../controllers/admin');
const getproducs = require('../controllers/admin');

const isAuth = require('../middleware/is-auth')
// const routeDir = require('../util/path')




router.get('/add-product', isAuth, getproducs.getProducts);

router.get('/admin-products', isAuth, getproducs.getAdminProduct)

router.get('/edit-product/:productId', isAuth, getproducs.getEditProducts)

router.post('/add-product', isAuth, postprod.postProduct)

router.post('/edit-product', isAuth, postprod.postEdit);

router.post('/delete-product', isAuth, postprod.deleteProduct)

module.exports = { router };