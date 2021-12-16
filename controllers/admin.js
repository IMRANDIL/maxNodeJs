
const Product = require('../modals/product')



exports.postProduct = (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const desc = req.body.desc
    const product = new Product(title, imageUrl, desc, price);
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







