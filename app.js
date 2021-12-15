const express = require('express');
const path = require('path')
const { router } = require('./routes/admin');
const shoprouter = require('./routes/shop');
const Err = require('./controllers/err');

// const expressHandle = require('express-handlebars')

// const bodyparser = require('body-parser')
const app = express();
app.use(express.static(path.join(__dirname, 'public/css')))

app.use(express.urlencoded({ extended: true }));
// app.use(express.json())
app.use(shoprouter)
app.use('/', router)

// app.engine('handlebars', expressHandle())

app.set('view engine', 'ejs');


// app.set('view engine', 'pug');
app.set('views', 'views')


app.use(Err.err)

app.listen(5000)