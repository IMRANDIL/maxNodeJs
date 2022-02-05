
const Product = require('../modals/product')



exports.postProduct = (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const desc = req.body.desc;
    // const userId = req.Specuser.id;
    const product = new Product(title, price, desc, imageUrl)
    product.save().then((result) => {

        // console.log(`Successfully Created`);
        res.redirect('/products')
    }).catch(err => console.log(err))



}


exports.getEditProducts = (req, res) => {

    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/')
    }
    const prodId = req.params.productId;
    Product.findByPk(prodId).then((product) => {
        if (!product) {
            return res.redirect('/');
        }
        else {
            res.render('admin/edit-product', { product, title: `Edit__Product`, path: req.url, editing: editMode })
        }
    }).catch(err => console.log(err));

}





exports.postEdit = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.desc;
    Product.findByPk(prodId).then((product) => {
        product.title = updatedTitle;
        product.imageUrl = updatedUrl;
        product.price = updatedPrice;
        product.desc = updatedDesc;
        return product.save();

    }).then((result) => {
        console.log(`successfully updated ${result.title}`);
        res.redirect('/products')
    })
        .catch(err => console.log(err))

}


exports.deleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId).then((product) => {
        return product.destroy();

    }).then((result) => {
        console.log('Succssfully deleted ', result.title);
        res.redirect('/admin-products')

    }).catch(err => console.log(err))

}




exports.getProducts = (req, res) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))

    res.render('admin/edit-product', { title: `Add__Product`, path: req.url, editing: false })

}






exports.getAdminProduct = (req, res, next) => {
    req.Specuser.getProducts().then((rows) => {
        res.render('admin/product-list', { rows, title: 'The Admin', path: req.url, hasProducts: rows.length > 0 });
    }).catch(err => console.log(err))
}







