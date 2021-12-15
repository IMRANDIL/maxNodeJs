// const { product } = require('../routes/admin');
// const products = [];

const Product = require('../modals/product')


exports.getProduct = (req, res) => {

    Product.fetchAll((product) => {
        const products = [...product]
        console.log(product);

        res.render('shop', { products, title: 'The Shop', path: req.url, hasProducts: products.length > 0 });
    });








}



exports.postProduct = (req, res) => {
    const product = new Product(req.body.title);
    product.save()
    // products.push(req.body)

    return res.redirect('/')

}


exports.getProducts = (req, res) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))

    res.render('add-product', { title: `Add__Product`, path: req.url })

}







