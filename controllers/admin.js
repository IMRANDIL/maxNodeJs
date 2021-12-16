
const Product = require('../modals/product')



exports.postProduct = (req, res) => {
    const product = new Product(req.body.title);
    product.save()
    // products.push(req.body)

    return res.redirect('/products')

}


exports.getProducts = (req, res) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))

    res.render('admin/add-product', { title: `Add__Product`, path: req.url })

}


exports.getAdminProduct = (req, res, next) => {
    Product.fetchAll((product) => {
        const products = [...product]
        console.log(product);

        res.render('admin/product-list', { products, title: 'The Admin', path: req.url, hasProducts: products.length > 0 });
    });
}







