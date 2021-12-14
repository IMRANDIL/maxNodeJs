const express = require('express');
const path = require('path')
const { router } = require('./routes/admin');
const shoprouter = require('./routes/shop');
const Err = require('./controllers/products')
// const expressHandle = require('express-handlebars')

// const bodyparser = require('body-parser')
const app = express();


app.use(express.urlencoded({ extended: true }));
// app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', router)
app.use(shoprouter)
// app.engine('handlebars', expressHandle())

app.set('view engine', 'ejs');


// app.set('view engine', 'pug');
app.set('views', 'views')


app.use(Err.err)

app.listen(5000, () => console.log('server is running on port: 5000'))