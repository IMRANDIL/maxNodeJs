const { json } = require('body-parser');
const fs = require('fs');
const path = require('path')
const pth = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductFrom = (cb) => {
    fs.readFile(pth, (err, data) => {
        if (err) {

            cb([{}])
        }
        else {
            cb(JSON.parse(data))
        }
    })
}


module.exports = class Product {
    constructor(title, imageUrl, desc, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.desc = desc;
        this.price = price;

    }
    save() {
        // products.push(this)
        this.id = Math.random().toString();

        getProductFrom((products) => {
            products.push(this);

            fs.writeFile(pth, JSON.stringify(products), (err) => console.log(err));
        })

    }


    static fetchAll(cb) {

        getProductFrom(cb)

    }

    static findbyId(id, cb) {
        getProductFrom((products) => {
            const product = products.find(p => p.id === id);
            cb(product)
        })
    }
}






// const data = fs.readFileSync(pth, 'utf-8');
// if (data === '') {
//     fs.writeFileSync(pth, '[]')
// }
// return JSON.parse(data)