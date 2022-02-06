const mongodb = require('mongodb')
const Product = require('../modals/product')

// const Id = new mongodb.ObjectId;

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
    Product.findById(prodId).then((product) => {
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


    const product = new Product(updatedTitle, updatedPrice, updatedDesc, updatedUrl, prodId);



    product.save().then((result) => {
        // console.log(`successfully updated`);
        res.redirect('/products')
    })
        .catch(err => console.log(err))

}


exports.deleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId)
        .then(() => {
            // console.log('Succssfully deleted ');
            res.redirect('/admin-products')

        }).catch(err => console.log(err))

}




exports.getProducts = (req, res) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))

    res.render('admin/edit-product', { title: `Add__Product`, path: req.url, editing: false })

}






exports.getAdminProduct = (req, res, next) => {
    Product.fetchAll().then((rows) => {
        res.render('admin/product-list', { rows, title: 'The Admin', path: req.url, hasProducts: rows.length > 0 });
    }).catch(err => console.log(err))
}







