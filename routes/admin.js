const express = require('express');
const path = require('path');
const router = express.Router();
const routeDir = require('../util/path')

const product = [];

router.get('/add-product', (req, res) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))

    res.render('add-product', { title: `Add__Product` })

})


router.post('/add-product', (req, res) => {
    product.push(req.body)

    res.redirect('/')

})



module.exports = { router, product };