const express = require('express');
const path = require('path');

const { router } = require('./routes/admin');
const shoprouter = require('./routes/shop');
const Err = require('./controllers/err');
const sequelize = require('./util/database');
const Product = require('./modals/product');
const User = require('./modals/user');
const Cart = require('./modals/cart');
const CartItem = require('./modals/cart-item');


const app = express();

const userSpec = async (req, res, next) => {
    try {
        const Specuser = await User.findByPk(1);

        req.Specuser = Specuser;

        next()


    } catch (error) {
        console.log(error);
    }


}

app.use(userSpec)



app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.use('/', shoprouter)
app.use('/', router);





require('dotenv').config();
// app.engine('handlebars', expressHandle())
const port = process.env.PORT || 8000;


app.set('view engine', 'ejs');


// app.set('view engine', 'pug');
app.set('views', 'views');










//Relations....

Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});

User.hasMany(Product);


User.hasOne(Cart)

Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });

Product.belongsToMany(Cart, { through: CartItem })










app.use(Err.err);



// sequelize.sync({ force: true })

sequelize.sync({ force: true }).then((result) => {
    return User.findByPk(1);

    // console.log(result);
}).then((user) => {
    if (!user) {
        return User.create({ name: 'Ali', email: 'aliimranadil2@gmail.com' })
    }
    return user;
}).then((user) => {
    // console.log(user);
    app.listen(port)
}).catch(err => console.log(err))

