
const Product = require('../modals/product')

// const Id = new mongodb.ObjectId;

exports.postProduct = (req, res) => {
    const title = req.body.title;
    const ImageUrl = req.body.ImageUrl;
    const price = req.body.price;
    const desc = req.body.desc;
    // const userId = req.Specuser.id;
    const product = new Product({ title: title, price: price, desc: desc, ImageUrl: ImageUrl, userId: req.user })
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
    const updatedUrl = req.body.ImageUrl;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.desc;

    Product.findById(prodId).then((product) => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.desc = updatedDesc;
        product.ImageUrl = updatedUrl;


        return product.save()
    })
        .then((result) => {
            // console.log(`successfully updated`);
            res.redirect('/products')
        })
        .catch(err => console.log(err))

}


exports.deleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findOneAndRemove(prodId)
        .then(() => {
            // console.log('Succssfully deleted ');
            res.redirect('/admin-products')

        }).catch(err => console.log(err))

}




exports.getProducts = (req, res) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
    // if (!req.session.isLoggedIn) {
    //     return res.redirect('/login')
    // }

    res.render('admin/edit-product', { title: `Add__Product`, path: req.url, editing: false })

}






exports.getAdminProduct = (req, res, next) => {
    // if (!req.session.isLoggedIn) {
    //     return res.redirect('/login')
    // }
    Product.find({})
        // populate('userId')
        .then((rows) => {
            // console.log(rows)
            res.render('admin/product-list', { rows, title: 'The Admin', path: req.url, hasProducts: rows.length > 0 });
        }).catch(err => console.log(err))
}







