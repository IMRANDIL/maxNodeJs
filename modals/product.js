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
    constructor(title) {
        this.title = title;
    }
    save() {
        // products.push(this)
        getProductFrom((products) => {
            products.push(this);

            fs.writeFile(pth, JSON.stringify(products), (err) => console.log(err));
        })

    }


    static fetchAll(cb) {

        getProductFrom(cb)

    }
}






// const data = fs.readFileSync(pth, 'utf-8');
// if (data === '') {
//     fs.writeFileSync(pth, '[]')
// }
// return JSON.parse(data)