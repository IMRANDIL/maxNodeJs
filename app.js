const express = require('express');
const path = require('path');
require('dotenv');
const { router } = require('./routes/admin');
const shoprouter = require('./routes/shop');
const Err = require('./controllers/err');
const sequelize = require('./util/database');
// const expressHandle = require('express-handlebars')

// const bodyparser = require('body-parser')
const app = express();


app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }));
// app.use(express.json())
app.use('/', shoprouter)
app.use('/', router)

// app.engine('handlebars', expressHandle())
const port = process.env.PORT || 5000
app.set('view engine', 'ejs');


// app.set('view engine', 'pug');
app.set('views', 'views')


app.use(Err.err)
sequelize.sync().then((result) => {

    app.listen(port)
    // console.log(result);
}).catch(err => console.log(err))

