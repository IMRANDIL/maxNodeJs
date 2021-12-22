
const Product = require('../modals/product')



exports.postProduct = (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const desc = req.body.desc
    Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        desc: desc
    }).then((result) => {
        console.log('Successfully Created');
        res.redirect('/products')
    }).catch(err => console.log(err))



}


exports.getEditProducts = (req, res) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/')
    }
    const prodId = req.params.productId;
    Product.findbyId(prodId, (product) => {
        if (!product) {
            return res.redirect('/')
        }
        res.render('admin/edit-product', { product, title: `Edit__Product`, path: req.url, editing: editMode })

    })

}





exports.postEdit = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.desc;
    const updatedProduct = new Product(prodId, updatedTitle, updatedUrl, updatedDesc, updatedPrice);
    updatedProduct.save();
    return res.redirect('/products')
}


exports.deleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId).then((product) => {
        return product.destroy();

    }).then((result) => {
        console.log('Succssfully deleted ', result);
        res.redirect('/admin-products')

    }).catch(err => console.log(err))

}




exports.getProducts = (req, res) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))

    res.render('admin/edit-product', { title: `Add__Product`, path: req.url, editing: false })

}






exports.getAdminProduct = (req, res, next) => {
    Product.findAll().then((rows) => {
        res.render('admin/product-list', { rows, title: 'The Admin', path: req.url, hasProducts: rows.length > 0 });
    }).catch(err => console.log(err))
}







