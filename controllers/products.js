// const { product } = require('../routes/admin');
const products = [];


exports.getProduct = (req, res) => {
    const productss = [...products];
    console.log(products);
    res.render('shop', { productss, title: 'The Shop', path: '/', hasProducts: productss.length > 0 })
}



exports.postProduct = (req, res) => {
    products.push(req.body)

    res.redirect('/')

}











