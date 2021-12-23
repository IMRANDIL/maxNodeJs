const express = require('express');
const path = require('path');

const { router } = require('./routes/admin');
const shoprouter = require('./routes/shop');
const Err = require('./controllers/err');
const sequelize = require('./util/database');
const Product = require('./modals/product');
const User = require('./modals/user');
// const expressHandle = require('express-handlebars')

// const bodyparser = require('body-parser')
const app = express();


app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }));
// app.use(express.json())
app.use('/', shoprouter)
app.use('/', router)
require('dotenv').config();
// app.engine('handlebars', expressHandle())
const port = process.env.PORT || 8000;

app.use((req, res, next) => {
    User.findByPk(1).then((user) => {
        req.user = user;
        next()
    }).catch(err => console.log(err))
})

app.set('view engine', 'ejs');


// app.set('view engine', 'pug');
app.set('views', 'views')


app.use(Err.err);

Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});

User.hasMany(Product);

// sequelize.sync({ force: true })

sequelize.sync().then((result) => {
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
})
    .catch(err => console.log(err))

