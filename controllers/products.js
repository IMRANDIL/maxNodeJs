// const { product } = require('../routes/admin');
// const products = [];

const Product = require('../modals/product')


exports.getProduct = (req, res) => {
    const product = Product.fetchAll()
    const products = [...product]
    console.log(products);

    res.render('shop', { products, title: 'The Shop', path: '/', hasProducts: products.length > 0 })
}



exports.postProduct = (req, res) => {
    const product = new Product(req.body.title);
    product.save()
    // products.push(req.body)

    res.redirect('/')

}


exports.getProducts = (req, res) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))

    res.render('add-product', { title: `Add__Product`, path: '/add-product' })

}



exports.err = (req, res, next) => {
    res.status(404).render('404', { title: `404 Page`, path: req.url })
}




