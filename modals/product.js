const db = require('../util/database');
const Cart = require('../modals/cart')


module.exports = class Product {
    constructor(id, title, imageUrl, desc, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.desc = desc;
        this.price = price;

    }
    save() {
        return db.execute('INSERT INTO `products` (`title`, `price`, `desc`, `imageUrl`) VALUES (?, ?, ?, ?)', [this.title, this.price, this.desc, this.imageUrl]);
        // products.push(this)



    }




    static delete(id) {

    }





    static fetchAll() {
        return db.execute('SELECT * FROM NodeJs.products');


    }

    static findbyId(id) {

    }
}






// const data = fs.readFileSync(pth, 'utf-8');
// if (data === '') {
//     fs.writeFileSync(pth, '[]')
// }
// return JSON.parse(data)