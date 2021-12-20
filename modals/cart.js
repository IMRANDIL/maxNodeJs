const { json } = require('body-parser');
const fs = require('fs');
const path = require('path')


const pth = path.join(path.dirname(process.mainModule.filename), 'data', 'carts.json');

module.exports = class Cart {
    static addProduct(id, productPrice) {
        //Fetch the previous cart
        fs.readFile(pth, (err, fileCont) => {
            let cart = { products: [], totalPrice: 0 }
            if (!err) {
                cart = JSON.parse(fileCont)
            }
            // Analyze the cart ..Find existing product
            const existCartIndex = cart.products.findIndex(p => p.id === id);
            const existingProduct = cart.products[existCartIndex]
            let updatedProduct;
            // Add new product/increase quantity
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existCartIndex] = updatedProduct;
            }
            else {
                updatedProduct = { id: id, qty: 1 }
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(pth, JSON.stringify(cart), (err) => console.log(err))
        })


    }

    static deleteProduct(id, productPrice) {
        fs.readFile(pth, (err, fileCont) => {
            if (err) return;
            const updatedCart = { ...fileCont };
            const product = updatedCart.products.find(p => p.id === id);
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
            fs.writeFile(pth, JSON.stringify(updatedCart), (err) => console.log(err))
        })
    }




    static getCart(cb) {
        fs.readFile(pth, (err, fileCont) => {
            const cart = JSON.parse(fileCont);
            if (err) {
                cb(null)
            }
            else {
                cb(cart)
            }
        })
    }




}