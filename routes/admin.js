const express = require('express');
// const path = require('path');
const router = express.Router();
const postprod = require('../controllers/products')
// const routeDir = require('../util/path')




router.get('/add-product', (req, res) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))

    res.render('add-product', { title: `Add__Product`, path: '/add-product' })

})


router.post('/add-product', postprod.postProduct)



module.exports = { router };